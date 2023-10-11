import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css'],
})
export class DisplayComponent {
    @Input() expression !: string | null;

    @Output() fromDisplay = new EventEmitter<string>();

    expressionFromDisplay(expression: string) {
        this.fromDisplay.emit(expression);
    }
}
