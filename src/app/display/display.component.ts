import { Component } from '@angular/core';
import {
    Observable,
} from 'rxjs';

@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css'],
})
export class DisplayComponent {

    expression$ !: Observable<string>;

    expressionFromDisplay(expression: string) {}
}
