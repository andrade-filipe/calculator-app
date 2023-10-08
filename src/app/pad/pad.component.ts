import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalculatorService } from '../services/calculator-service/calculator.service';

@Component({
    selector: 'app-pad',
    templateUrl: './pad.component.html',
    styleUrls: ['./pad.component.css'],
})
export class PadComponent {
    @Output() clickedPad = new EventEmitter<string>();

    padDigits: Map<string, string> = new Map([
        ['parenthesis_right', '('],
        ['parenthesis_left', ')'],
        ['percentage', '%'],
        ['multiply', '*'],
        ['divide', '/'],
        ['subtract', '-'],
        ['add', '+'],
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
        ['solve', 'solve'],
        ['clear', 'clear'],
    ]);

    constructor(private calculatorService: CalculatorService) {}

    change = 0;
    expressionParser(digit: string): void {
        let clicked = this.padDigits.get(digit);

        if (clicked != undefined) {
            this.clickedPad.emit(`${clicked + this.change}`);
            this.change++;
        }
    }
}
