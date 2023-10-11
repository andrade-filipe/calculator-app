import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css'],
})
export class DisplayComponent {
    @Input() expression: string = '';

    @Output() fromDisplay = new EventEmitter<string>();

    expressionFromDisplay(expression: string) {
        this.fromDisplay.emit(expression);
    }
}
