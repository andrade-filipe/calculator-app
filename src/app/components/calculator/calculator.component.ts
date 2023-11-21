import { CalculatorService } from '../../services/calculator-service/calculator.service';
import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { Expression } from '../../interfaces/expression';

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

    /**
     * process all data coming from the PadComponent
     * @param event
     */
    fromPad(event: string) {
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

    /**
     * process data coming from the input on DisplayComponent
     * @param event
     */
    fromDisplay(event: string) {
        this.displayExpression = event;
    }

    /**
     * Perform the subscription to getExpression from Service that sends to the API
     */
    private getExpression(): void {
        if (this.displayExpression != '') {
            this.calculatorService.getExpression().subscribe({
                next: (value) => (this.displayExpression = value.expression),
                error: (err) => throwError(() => new Error("couldn't get expression")),
                complete: () => {},
            });
        } else {
            throw new Error("couldn't get expression");
        }
    }

    /**
     * Perform the subscription to clearExpression from Service that sends to the API
     */
    private clearExpression(): void {
        this.calculatorService.clearExpression().subscribe({
            error: (err) => throwError(() => new Error("couldn't clear expression")),
            complete: () => {
                this.getExpression();
            },
        });
    }

    /**
     * Perform the subscription to solveExpression from Service that sends to the API
     */
    private solveExpression(): void {
        this.calculatorService.solveExpression().subscribe({
            error: (err) => throwError(() => new Error("Couldn't solve Expression")),
            complete: () => {
                this.getExpression();
            },
        });
    }

    /**
     * Perform the subscription to buildExpression from Service that sends to the API
     */
    public buildExpression(): void {
        this.displayExpression.trim();
        if(this.checkExpression(this.displayExpression)){
            let expression: Expression = { expression: this.displayExpression };
            this.calculatorService.buildExpression(expression).subscribe({
                error: (err) => throwError(() => new Error("Couldn't build expression")),
                complete: () => {
                    this.solveExpression();
                },
            });
        } else {
            throw new Error('Invalid Expression');
        }

    }

    /**
     * checks some conditions in order to guarantee it's not a invalid expression
     * @param expression
     * @returns if is a valid expression without invalid chars
     */
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

    /**
     * captures when te user press Enter on the keyboard using the input box inside DisplayComponent
     * @param event
     */
    enterEvent(event: any) {
        this.fromPad('solve');
    }
}
