import { Component, Input, ViewChild } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { AppService } from '../../../services/app.service'
import { Exercise } from '../../../models/entity/exercise/exercise'
import { EntityFormModal } from '../../../models/entity/entity-form-modal'
import { ExerciseService } from '../../../services/http/entities/exercise.service'
import { BODY_PARTS } from '../../../models/entity/exercise/body-part'
import { PictureService } from '../../../services/utility/picture.service'

@Component({
    selector: 'app-exercise-form',
    templateUrl: './exercise-form-modal.component.html',
    styleUrls: [ './exercise-form-modal.component.scss' ],
})
export class ExerciseFormModal extends EntityFormModal<Exercise> {
    @ViewChild('fileInput') fileInput: { nativeElement: { click: () => void } }
    @Input() existingEntity: Exercise = {
        creatorId: this.app.curUser._id,
    }

    constructor(app: AppService, fb: FormBuilder, service: ExerciseService, private pictures: PictureService) {
        super(app, fb, service)
    }

    get bodyPart(): string {
        return this.form.value.bodyPart
    }

    set bodyPart(v: string) {
        this.form.patchValue({ bodyPart: v })
    }

    getPicture() {
        this.pictures.getPicture({ width: 96, height: 96 }, this.fileInput.nativeElement)
            .then(data => this.form.patchValue({ picture: `data:image/jpg;base64,${data}` }))
    }

    onFileReceived(event) {
        this.pictures.processWebImage(event.target.files[0]).then(picture => this.form.patchValue({ picture }))
    }


    pickBodyPart(): void {
        this.app.view.picker.present<string>(
            [ {
                name: 'body parts',
                options: BODY_PARTS.map(it => ({ text: it, value: it })),
                selectedIndex: BODY_PARTS.indexOf(this.bodyPart),
            } ])
            .then(res => this.bodyPart = res)
    }

    // TODO: add videoUrl and link url validation. Add YouTube api
    buildForm(): void {
        this.form = this.fb.group({
            title: [ this.existingEntity.title || '', Validators.required ],
            bodyPart: [ this.existingEntity.bodyPart || '' ],
            link: [ this.existingEntity.link || '' ],
            picture: [ this.existingEntity.picture ],
            description: [ this.existingEntity.description || '', Validators.required ],
            videoUrl: [ this.existingEntity.videoUrl || '' ],
        })
    }
}
