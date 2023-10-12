import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css'],
})
export class DisplayComponent {
    @Input() expression !: string;

    @Output() fromDisplay = new EventEmitter<string>();

    @Output() enterEventEmitter = new EventEmitter<any>();

    expressionFromDisplay(expression: string) {
        this.fromDisplay.emit(expression);
    }

    enterEvent(event: any) {
        this.enterEventEmitter.emit(event);
    }
}
