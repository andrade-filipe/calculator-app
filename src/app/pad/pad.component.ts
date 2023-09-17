import { Component } from '@angular/core';
import { CalculatorService } from '../services/calculator-service/calculator.service';
import { Expression } from '../interfaces/expression';

@Component({
    selector: 'app-pad',
    templateUrl: './pad.component.html',
    styleUrls: ['./pad.component.css'],
})
export class PadComponent {
    expression!: Expression;

    padDigits: Map<string, string> = new Map([
        ['parenthesis_right', '('],
        ['parenthesis_left', ')'],
        ['percentage', '%'],
        ['multiply', ' * '],
        ['divide', ' / '],
        ['subtract', ' - '],
        ['add', ' + '],
        ['dot', '.'],
        ['number_one', '1'],
        ['number_two', '2'],
        ['number_three', '3'],
        ['number_four', '4'],
        ['number_five', '5'],
        ['number_six', '6'],
        ['number_seven', '7'],
        ['number_eight', '8'],
        ['number_nine', '9'],
        ['number_zero', '0'],
    ]);
    constructor(private calculatorService: CalculatorService) {}

    expressionParser(digit: string): void {
        this.expression = { expression: this.padDigits.get(digit) };
        this.buildExpression(this.expression);
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
