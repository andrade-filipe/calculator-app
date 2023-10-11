import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CalculatorService } from '../services/calculator-service/calculator.service';
import { catchError, map, of, take, throwError } from 'rxjs';
import { Expression } from '../interfaces/expression';

@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css'],
})
export class DisplayComponent implements OnInit, OnChanges {
    @Input() clickedReceptor!: string;

    expression!: Expression;

    currExpression!: string | undefined;

    constructor(private calculatorService: CalculatorService) {}

    ngOnInit(): void {
        this.currExpression = '';
        this.getExpression();
    }

    ngOnChanges(): void {
        if (
            this.clickedReceptor != undefined &&
            this.currExpression != undefined
        ) {
            if (this.clickedReceptor.startsWith('c', 0)) {
                this.clearExpression();
            } else if (this.clickedReceptor.startsWith('s', 0)) {
                this.solveExpression();
            } else {
                this.onKey(
                    this.currExpression + this.clickedReceptor.charAt(0)
                );
            }
            this.getExpression();
        }
    }

    onKey(value: string | undefined) {
        this.expression = { expression: value };
        if (this.expression.expression != '') {
            this.buildExpression(this.expression);
        } else {
            this.currExpression = value;
        }
    }

    buildExpression(buildThis: Expression): void {
        this.calculatorService.buildExpression(buildThis);
    }

    getExpression() {
        this.calculatorService
            .getExpression()
            .pipe(
                map((response) => {
                    this.currExpression = response.data.expression;
                }),
                take(1),
                catchError((err) => {
                    throwError(() => {
                        return err;
                    });
                    return of();
                })
            )
            .subscribe();
    }

    solveExpression() {
        if (this.checkExpression(this.currExpression)) {
            this.calculatorService
                .solveExpression()
                .pipe(
                    take(1),
                    catchError((err) => {
                        throwError(() => {
                            return err;
                        });
                        return of();
                    })
                )
                .subscribe();
        } else {
            throw new Error('Invalid Expression');
        }
    }

    clearExpression() {
        this.onKey('');
        this.calculatorService
            .clearExpression()
            .pipe(
                take(1),
                catchError((err) => {
                    throwError(() => {
                        return err;
                    });
                    return of();
                })
            )
            .subscribe();
    }

    checkExpression(expression: string | undefined): boolean {
        if (
            expression?.includes('%%') ||
            expression?.includes('//') ||
            expression?.includes('()') ||
            expression?.includes('**') ||
            expression?.match(new RegExp('[a-zA-z]'))
        ) {
            return false;
        }
        return true;
    }
}
