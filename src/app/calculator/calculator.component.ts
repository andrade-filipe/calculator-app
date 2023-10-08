import { CalculatorService } from '../services/calculator-service/calculator.service'
import { Component } from '@angular/core';

@Component({
    selector: 'app-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {
    constructor(private CalculatorService: CalculatorService) {}

    clickedVar !: string;

    clickedEvent(event: string) {
        this.clickedVar = event;
    }
}
