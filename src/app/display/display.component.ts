import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CalculatorService } from '../services/calculator-service/calculator.service';
import { Observable, catchError, map, of, throwError } from 'rxjs';
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
        if (this.clickedReceptor != undefined) {
            if (this.clickedReceptor.startsWith('c', 0)) {
                this.clearExpression();
            } else if (this.clickedReceptor.startsWith('s', 0)) {
                this.solveExpression();
            } else {
                if (this.currExpression == undefined) {
                    this.currExpression = '';
                }
                this.onKey(
                    this.currExpression + this.clickedReceptor.charAt(0)
                );
            }
        }
        this.getExpression();
    }

    onKey(value: string | undefined) {
        value?.trim();
        this.expression = { expression: value };
        if (this.expression.expression != '') {
            this.buildExpression(this.expression);
        } else {
            this.currExpression = '';
        }
    }

    buildExpression(buildThis: Expression): void {
        this.currExpression = buildThis.expression;
        this.calculatorService.buildExpression(buildThis);
    }

    getExpression() {
        this.expression$ = this.calculatorService.getExpression().pipe(
            map((response) => {
                return response.data.expression;
            }),
            catchError((err) => {
                throwError(() => {
                    return err;
                });
                return of();
            })
        );
    }

    solveExpression() {
        if (this.checkExpression(this.expression.expression)){
            this.calculatorService.solveExpression()
            .pipe(
                map((solved) => {
                    this.onKey(solved.data.expression);
                }),
                catchError((err) => {
                    throwError(() => {
                        return err;
                    });
                    return of();
                })
            )
            .subscribe();
        } else {
            throw new Error("Invalid Expression");
        }
    }

    clearExpression() {
        this.onKey('');
        this.calculatorService.clearExpression()
            .pipe(
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
        if(expression?.includes("%%") ||
            expression?.includes("//") ||
            expression?.includes("()") ||
            expression?.includes("**")){
            return false;
        }
        return true;
    }
}
