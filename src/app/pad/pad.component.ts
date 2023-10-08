import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalculatorService } from '../services/calculator-service/calculator.service';
import { Expression } from '../interfaces/expression';
import { CustomResponse } from '../interfaces/custom-response';

@Component({
    selector: 'app-pad',
    templateUrl: './pad.component.html',
    styleUrls: ['./pad.component.css'],
})
export class PadComponent implements OnInit {
    @Output() clicked = new EventEmitter<CustomResponse>();

    @Input() currExpression !: Expression;

    expression !: Expression;

    aux !: CustomResponse;

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

    ngOnInit(): void {
        this.expression = this.currExpression;
    }

    expressionParser(digit: string): void {
        console.log("parser")
        let concatenate = this.padDigits.get(digit);
        if (concatenate != undefined) {
            this.buildExpression(concatenate);
        }
    }

    buildExpression(digit: string): void {
        console.log("build");
        this.expression = {expression: this.currExpression.expression + digit};
        this.calculatorService.build$(this.expression).subscribe(response => this.aux = response);
        this.clicked.emit(this.aux);
    }

    solveExpression() {
        this.calculatorService.solve$.subscribe(response => this.aux = response)
        this.clicked.emit(this.aux);
    }

    clearExpression() {
        this.calculatorService.clear$.subscribe(response => this.aux = response)
        this.clicked.emit(this.aux);
    }
}
