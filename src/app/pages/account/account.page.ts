import { Component, OnInit } from '@angular/core'
import { SecurityModal } from '../../components/user/security/security.component'
import { AppService } from '../../services/app.service'
import { UserService } from '../../services/http/entities/user.service'
import { AuthService } from '../../services/http/auth.service'
import { compact, get, mean } from 'lodash'
import { UserFormModal } from '../../components/user/form/user-form.component'
import { InspiringMessageService } from '../../services/http/entities/inspiring-message.service'
import { Chart } from 'chart.js'
import { map } from 'rxjs/operators'
import moment, { Moment } from 'moment'

@Component({
    selector: 'app-account',
    templateUrl: './account.page.html',
    styleUrls: [ './account.page.scss' ],
})
export class AccountPage implements OnInit {
    inspiringMessage: string

    chart: Chart

    constructor(public app: AppService, private auth: AuthService, private service: UserService, private inspiration: InspiringMessageService) {
    }

    get picture() {
        return get(this.app.curUser, [ 'picture' ])
    }

    createChart(): void {
        this.service.curUserTasks
            .pipe(map(tasks => tasks.filter(task => task.setRecordings && compact(task.setRecordings).length)))
            .subscribe(tasks => {
                const data: { labels: string[], datasets: any[] } = { labels: [], datasets: [] }

                let max: Moment = moment(0)
                let min: Moment = moment()

                tasks.forEach(task => {
                    data.labels.push(task.title)
                    data.datasets.push({
                        label: task.title,
                        fillColor: 'rgba(0,0,0,0)',
                        data: task.setRecordings.map(it => {
                            if (it.completedOn) {
                                max = moment.max(max, moment(it.completedOn))
                                min = moment.min(min, moment(it.completedOn))
                                return {
                                    x: it.completedOn,
                                    y: Math.round(mean(it.recording)),
                                }
                            }
                        }),
                    })
                })

                this.chart = new Chart(document.getElementById('progress-chart'), {
                    type: 'line',
                    data,
                    options: {
                        maintainAspectRatio: false,
                        scales: {
                            xAxes: [ {
                                type: 'time',
                                time: {
                                    unit: 'day',
                                    min: min.subtract(1, 'd'),
                                    max: max.add(1, 'd'),
                                },
                                distribution: 'series',
                                ticks: {
                                    source: 'data',
                                },
                            } ],
                        },
                    },
                })
            })
    }

    ngOnInit(): void {
        this.inspiration.randomMessage.subscribe(res => this.inspiringMessage = res.message)
        this.createChart()
    }

    edit() {
        this.app.view.modal.present(UserFormModal).finally(() => this.service.refreshCurUser())
    }

    security() {
        // todo: update things if not done in security modal
        this.app.view.modal.present(SecurityModal)
    }

    signout() {
        this.app.navigate('welcome').then(() => this.auth.signout())
    }
}
