import { Component, OnInit } from '@angular/core'
import { User } from '../../models/entity/user/user'
import { UserService } from '../../services/http/entities/user.service'
import { AppService } from '../../services/app.service'
import { Observable } from 'rxjs'
import { Task } from '../../models/entity/task/task'
import { map } from 'rxjs/operators'

@Component({
    selector: 'app-therapist',
    templateUrl: './therapist.page.html',
    styleUrls: [ './therapist.page.scss' ],
})
export class TherapistPage implements OnInit {
    patients: Observable<User[]>
    curUser: User

    constructor(private app: AppService, private service: UserService) {
    }

    assignPatient(email: string): void {

    }

    getTasksAssignedToUser(user: User): Observable<Task[]> {
        return this.service.getTasksOfUser(user._id).pipe(map((res: Task[]) => res.filter(it => it.issuerId === this.app.curUser._id)))
    }

    ngOnInit() {
        this.patients = this.service.curUserPatients
    }

}
