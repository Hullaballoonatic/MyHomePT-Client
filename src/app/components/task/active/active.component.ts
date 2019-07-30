import { Component, Input, OnInit } from '@angular/core'
import { AppService } from '../../../services/app.service'
import { ReadingAggregator } from '../../../models/readingAggregator'
import { FlexdotService } from '../../../services/bluetooth/flexdot.service'
import { Duration } from 'moment'
import { Observable } from 'rxjs'
import { Task } from '../../../models/entity/task/task'

@Component({
    selector: 'app-active',
    templateUrl: './active.component.html',
    styleUrls: [ './active.component.scss' ],
})
export class ActiveTaskComponent implements OnInit {
    reading$: Observable<number>
    duration$: Observable<Duration>
    private aggregator: ReadingAggregator
    @Input() private task: Task

    constructor(private app: AppService, private service: FlexdotService) {
    }

    pause() {
        this.aggregator.pause()
    }

    start() {
        this.service.startListening()
        this.aggregator.start(this.service.flexdots)
    }

    resume() {
        this.service.startListening()
        this.aggregator.resume()
    }

    stop() {
        this.aggregator.stop()
    }

    submit() {
        this.task.setRecordings.push(this.aggregator.result)
        this.app.view.modal.dismiss(this.aggregator.recentSummary)
    }

    cancel() {
        this.app.view.modal.dismiss()
    }

    ngOnInit(): void {
        this.aggregator = new ReadingAggregator(this.service.flexdots)
        this.reading$ = this.aggregator.reading$
        this.duration$ = this.aggregator.duration$
        this.start()
    }
}
