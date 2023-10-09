import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CalculatorService } from '../services/calculator-service/calculator.service';
import {
    Observable,
    map,
} from 'rxjs';
import { Expression } from '../interfaces/expression';

@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css'],
})
export class DisplayComponent implements OnInit, OnChanges {
    @Input() clickedReceptor!: string;

    expression$!: Observable<string | undefined>;

    expression!: Expression;

    currExpression: string | undefined;

    constructor(private calculatorService: CalculatorService) {}

    ngOnInit(): void {
        this.getExpression();
    }

    ngOnChanges(): void {
        if (this.clickedReceptor.startsWith('c')) {
            this.clearExpression();
        } else if (this.clickedReceptor.startsWith('s')) {
            this.solveExpression();
        } else {
            if (this.currExpression == undefined) {
                this.currExpression = '';
            }
            this.onKey(this.currExpression + this.clickedReceptor.charAt(0));
        }
        this.getExpression();
    }

    onKey(value: string | undefined) {
        this.expression = { expression: value}; //trim this
        if (this.expression.expression != '') {
            this.buildExpression(this.expression);
        } else {
            this.currExpression = '';
        }
    }

    getExpression() {
        this.expression$ = this.calculatorService.expression$.pipe(
            map((response) => {
                return response.data.expression;
            })
        );
    }

    buildExpression(buildThis: Expression): void {
        this.currExpression = buildThis.expression;
        this.calculatorService.build$(buildThis).subscribe();
    }

    solveExpression() {
        this.calculatorService.solve$
            .pipe(
                map((solved) => {
                    this.onKey(solved.data.expression);
                })
            )
            .subscribe();
    }

    clearExpression() {
        this.onKey('');
        this.calculatorService.clear$.subscribe();
    }
}
