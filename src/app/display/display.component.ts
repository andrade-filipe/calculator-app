import { CustomResponse } from 'src/app/interfaces/custom-response';
import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../services/calculator-service/calculator.service';
import {
    Observable,
    Subscription,
    distinctUntilChanged,
    map,
    mergeMap,
    of,
    repeat,
    switchMap,
    tap,
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

    // getExpression(): void{
    //     this.expression$ = this.calculatorService
    //     .expression$
    //     .pipe(
    //         map(response => {
    //             return response.data.expression
    //         })
    //         );
    //     };

    getExpression(): void {
        this.expression$ = this.calculatorService.expression$.pipe(
            distinctUntilChanged(
                (prev, curr) => prev.data.expression == curr.data.expression
            ),
            switchMap(
                async (response) => (
                    console.log('switchmap call'), response.data.expression
                )
            ),
            repeat()
        );
    }
}
