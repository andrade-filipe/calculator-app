import { CalculatorService } from '../services/calculator-service/calculator.service'
import { Component } from '@angular/core';
import { CustomResponse } from '../interfaces/custom-response';
import { Expression } from '../interfaces/expression';

@Component({
    selector: 'app-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {
    constructor(private CalculatorService: CalculatorService) {}

    refresh !: CustomResponse;

    expression !: Expression;

    refreshDisplay(event: CustomResponse) {
        this.refresh = event;
    }

    currExpression(expression: Expression) {
        this.expression = expression;
    }
}
