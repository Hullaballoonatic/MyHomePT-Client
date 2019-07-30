import { Component, NgZone, OnInit } from '@angular/core'
import { AppService } from '../../services/app.service'
import { Task } from '../../models/entity/task/task'
import { TaskService } from '../../services/http/entities/task.service'
import { UserService } from '../../services/http/entities/user.service'
import { TaskFormModal } from '../../components/task/form/task-form.component'
import { InspiringMessageService } from '../../services/http/entities/inspiring-message.service'
import { TaskComponent } from '../../components/task/task.component'

@Component({
    selector: 'app-tasks-list',
    templateUrl: './tasks.page.html',
    styleUrls: [ './tasks.page.scss' ],
})
export class TasksPage implements OnInit {
    tasks: Task[]

    // todo: user organization of tasks

    constructor(private service: TaskService, private zone: NgZone, private inspiration: InspiringMessageService, private userService: UserService, private app: AppService) {
    }

    presentTaskForm(task?: Task): void {
        this.app.view.modal.present(TaskFormModal, task && { existingEntity: task }).finally(() => this.doRefresh())
    }

    presentTask(task: Task) {
        this.app.view.modal.present(TaskComponent, { task }).finally(() => this.doRefresh())
    }

    doRefresh(event?): void {
        this.userService.curUserTasks.subscribe(tasks => {
            this.tasks = tasks
            if (event) {
                event.target.complete()
            }
        })
    }

    remove(task: Task): void {
        this.service.delete(task._id).subscribe(() => {
            this.tasks = this.tasks.splice(this.tasks.indexOf(task), 1)
            this.doRefresh()
        })
    }

    ngOnInit(): void {
        this.doRefresh()
    }
}
