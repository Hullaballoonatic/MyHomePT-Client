import { FormBuilder, FormGroup } from '@angular/forms'
import { OnInit } from '@angular/core'
import { AppService } from '../../services/app.service'
import { BaseType } from '../types'
import { EntityService } from './entity-service'

export abstract class EntityFormModal<T extends BaseType> implements OnInit {
    isEditForm: boolean
    form: FormGroup
    protected existingEntity: T

    protected constructor(protected app: AppService, protected fb: FormBuilder, protected service: EntityService<T>) {
    }

    protected get entity(): T {
        return this.form.value
    }

    public ngOnInit(): void {
        this.isEditForm = this.existingEntity && this.existingEntity._id
        this.buildForm()
    }

    abstract buildForm(): void

    submit(): void {
        this.service.save(this.entity).subscribe((res: T) => this.app.view.modal.dismiss(res))
    }

    dismiss(presentConfirm: boolean = this.form.dirty): void {
        if (presentConfirm) {
            this.app.view.alert.confirm('Are you sure you want to dismiss your changes?')
                .then(confirmed => confirmed && this.app.view.modal.dismiss())
        } else {
            this.app.view.modal.dismiss()
        }
    }
}
