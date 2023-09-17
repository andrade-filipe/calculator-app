import { CustomResponse } from 'src/app/interfaces/custom-response';
import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../services/calculator-service/calculator.service';
import {
    Observable,
    distinctUntilChanged,
    map,
    repeat,
} from 'rxjs';

@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css'],
})
export class DisplayComponent implements OnInit {
    expression$!: Observable<string | undefined>;

    constructor(private calculatorService: CalculatorService) {}

    ngOnInit(): void {
        this.getExpression();
    }

    getExpression(): void {
        this.expression$ = this.calculatorService.expression$.pipe(
            distinctUntilChanged((prev, curr) => prev.data.expression === curr.data.expression),
            map(response => {
                return response.data.expression
            }),
            repeat()
        );
    }
}
