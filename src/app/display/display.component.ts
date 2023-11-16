import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css'],
})
export class DisplayComponent {
    @Input() expression!: string;

    @Output() fromDisplay = new EventEmitter<string>();

    @Output() enterEventEmitter = new EventEmitter<any>();

    expressionFromDisplay(display: string) {
        this.fromDisplay.emit(display);
    }

    enterEvent(event: any) {
        this.enterEventEmitter.emit(event);
    }
}
