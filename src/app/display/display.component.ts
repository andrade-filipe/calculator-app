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
        this.clearExpression();
        this.getExpression();
    }

    ngOnChanges(): void {
        if (this.clickedReceptor.startsWith('c')) {
            this.clearExpression();
        } else if (this.clickedReceptor.startsWith('s')) {
            this.solveExpression();
        } else {
            this.expression = {
                expression: this.expression.expression + this.clickedReceptor.charAt(0),
            };
            this.onKey(this.expression.expression);
        }
        this.getExpression();
    }

    onKey(value: string | undefined) {
        this.expression = { expression: value };
        if (this.expression.expression != ''){
            this.buildExpression(this.expression);
        }
    }

    getExpression() {
        this.expression$ = this.calculatorService.expression$.pipe(
            map((response) => {
                this.onKey(response.data.expression)
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
