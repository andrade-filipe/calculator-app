import { CalculatorService } from '../services/calculator-service/calculator.service'
import { Component } from '@angular/core';
import { CustomResponse } from '../interfaces/custom-response';

@Component({
    selector: 'app-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {
    constructor(private CalculatorService: CalculatorService) {}

    refresh !: CustomResponse;

    concat !: string;

    refreshDisplay(event: CustomResponse) {
        this.refresh = event;
    }

    concatenate(digit: string) {
        this.concat = digit;
        console.log("calculator component");
    }
}
