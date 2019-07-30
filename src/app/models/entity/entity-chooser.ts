import { BaseType } from '../types'
import { difference, get, union } from 'lodash'
import { Observable, Subject } from 'rxjs'
import { OnInit } from '@angular/core'
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'
import { EntityService } from './entity-service'
import { Chooser } from '../chooser'

export abstract class EntityChooser<T extends BaseType> extends Chooser<T> implements OnInit {
    displayedEntities: Observable<T[]>
    searchField: string
    fields
    private searchTerms: Subject<string> = new Subject()

    protected constructor(protected service: EntityService<T>) {
        super()
    }

    ngOnInit(): void {
        this.displayedEntities = this.searchTerms.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((term) => this.service.searchBy(this.searchField, term)),
        )
        this.fields = get(this.choices, [ 'length' ]) && Object.keys(this.choices[0])
    }

    isSelected(entity: T): boolean {
        return this.selected.includes(entity)
    }

    protected deselect(entity: T): void {
        this.selected = difference(this.selected, [ entity ])
    }

    protected select(entity: T): void {
        this.selected = union(this.selected, [ entity ])
    }
}
