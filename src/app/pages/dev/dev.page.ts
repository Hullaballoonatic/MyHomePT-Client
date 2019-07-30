import { Component, OnInit } from '@angular/core'
import { AppService } from '../../services/app.service'
import { TokenService } from '../../services/utility/token.service'
import { privilegeToScore, scoreToPrivilege, UserService } from '../../services/http/entities/user.service'
import { User } from '../../models/entity/user/user'
import { UserChooser } from '../../components/user/chooser/user-chooser.component'
import { InspiringMessageService } from '../../services/http/entities/inspiring-message.service'
import { ExerciseService } from '../../services/http/entities/exercise.service'
import { defaultInspirations } from '../../models/entity/inspiration/inspiration'
import { defaultExercises } from '../../models/entity/exercise/exercise'

@Component({
    selector: 'app-dev',
    templateUrl: './dev.page.html',
    styleUrls: [ './dev.page.scss' ],
})
export class DevPage implements OnInit {
    users: User[]
    selectedUser: User
    showTokenDetails: boolean = false

    constructor(public app: AppService,
                private userService: UserService,
                private exerciseService: ExerciseService,
                private inspiration: InspiringMessageService,
                public token: TokenService,
    ) {
    }

    get privilege(): string {
        return this.selectedUser && scoreToPrivilege[this.selectedUser.privilege]
    }

    toggleTokenDetails(): void {
        this.showTokenDetails = !this.showTokenDetails
    }

    ngOnInit(): void {
        this.userService.all.subscribe(res => this.users = res)
        this.userService.curUser.subscribe(res => this.selectedUser = res)
    }

    pickPrivilege(): void {
        this.app.view.picker.present<any>([ {
            name: 'privilege',
            options: Object.entries(privilegeToScore).map(entry => ({ text: entry[0], value: entry[1] })),
        } ]).then(it => {
            if (it && this.selectedUser) {
                this.selectedUser.privilege = it.privilege
                this.userService.save(this.selectedUser).subscribe()
            }
        }).catch()
    }

    chooseUser(): void {
        this.app.view.modal.present<User>(UserChooser, { choices: this.users }).then(it => {
            if (it) {
                this.selectedUser = it
            }
        }).catch()
    }

    chooseTherapist() {
        this.app.view.modal.present<User>(UserChooser)
            .then(it => {
                if (it && this.selectedUser) {
                    this.userService.assignTherapistToUser(it._id, this.selectedUser._id).subscribe()
                }
            })
    }

    choosePatient() {
        this.app.view.modal.present<User>(UserChooser, { choices: this.users })
            .then(it => {
                if (it && this.selectedUser) {
                    this.userService.assignPatientToUser(it._id, this.selectedUser._id).subscribe()
                }
            })
    }

    pushDefaultInspiration() {
        this.inspiration.save(defaultInspirations).subscribe(console.log)
    }

    pushDefaultExercises() {
        this.exerciseService.save(defaultExercises).subscribe(console.log)
    }
}
