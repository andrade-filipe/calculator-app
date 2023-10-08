import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CalculatorService } from '../services/calculator-service/calculator.service';
import { Observable, map } from 'rxjs';
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

    constructor(private calculatorService: CalculatorService) {}

    ngOnInit(): void {
        this.onKey('');
        this.getExpression();
    }

    ngOnChanges(): void {
        if (this.clickedReceptor == 'clear') {
            this.clearExpression();
        } else if (this.clickedReceptor == 'solve') {
            this.solveExpression();
        } else {
            this.expression = {
                expression: this.expression.expression + this.clickedReceptor,
            };
            this.buildExpression(this.expression);
        }
        this.getExpression();
    }

    onKey(value: string) {
        this.expression = { expression: value };
        this.buildExpression(this.expression);
        this.getExpression();
    }

    getExpression() {
        this.expression$ = this.calculatorService.expression$.pipe(
            map((response) => {
                return response.data.expression;
            })
        );
    }

    buildExpression(expression: Expression): void {
        this.calculatorService.build$(expression).subscribe();
    }

    solveExpression() {
        this.calculatorService.solve$.subscribe();
    }

    clearExpression() {
        this.calculatorService.clear$.subscribe();
    }
}
