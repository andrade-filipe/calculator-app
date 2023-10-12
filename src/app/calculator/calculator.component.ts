import { CalculatorService } from './../services/calculator-service/calculator.service';
import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { Expression } from '../interfaces/expression';

@Component({
    selector: 'app-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
    constructor(private calculatorService: CalculatorService) {}

    displayExpression!: string;

    ngOnInit(): void {
        this.displayExpression = '';
    }

    clickedEvent(event: string) {
        if (event == 'clear') {
            this.clearExpression();
        } else if (event == 'solve') {
            if (this.checkExpression(this.displayExpression)) {
                this.buildExpression();
            } else {
                throw new Error('Invalid Expression');
            }
        } else {
            this.fromDisplay(this.displayExpression + event);
        }
    }

    fromDisplay(event: string) {
        this.displayExpression = event;
    }

    private getExpression(): void {
        if(this.displayExpression != ""){
            this.calculatorService.getExpression().subscribe({
                next: value => this.displayExpression = value.data.expression,
                error: (err) =>
                throwError(() => new Error("couldn't get expression")),
                complete: () => {}
            });
        } else {
            throw new Error("couldn't get expression");
        }
    }

    private clearExpression(): void {
        this.calculatorService.clearExpression().subscribe({
            error: (err) =>
                throwError(() => new Error("couldn't clear expression")),
            complete: () => {this.getExpression()},
        });
    }

    private solveExpression(): void {
        this.calculatorService.solveExpression().subscribe({
            error: (err) =>
                throwError(() => new Error("couldn't solve Expression")),
            complete: () => {this.getExpression()},
        });
    }

    private buildExpression(): void {
        console.log("build")
        let expression: Expression = { expression: this.displayExpression };
        this.calculatorService.buildExpression(expression).subscribe({
            error: (err) =>
                throwError(() => new Error("Couldn't build expression")),
            complete: () => {this.solveExpression()},
        });
    }

    private checkExpression(expression: string): boolean {
        if (
            expression?.includes('%%') ||
            expression?.includes('//') ||
            expression?.includes('()') ||
            expression?.includes('**') ||
            expression?.match(new RegExp('[a-zA-z]')) ||
            expression == ''
        ) {
            return false;
        }
        return true;
    }
}
