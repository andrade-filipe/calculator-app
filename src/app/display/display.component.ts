import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../services/calculator-service/calculator.service';
import {
    Subject,
    Observable,
    debounceTime,
    distinctUntilChanged,
    switchMap,
    map,
    observeOn,
    Subscription,
} from 'rxjs';

@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css'],
})
export class DisplayComponent implements OnInit {
    expression$!: Observable<string>;

    constructor(private calculatorService: CalculatorService) {}

    ngOnInit(): void {
        this.expression$ = this.calculatorService.getExpression().pipe(
            distinctUntilChanged(),
            map((value) => value.toString())
        );
    }
}
