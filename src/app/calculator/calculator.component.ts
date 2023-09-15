import { CalculatorService } from './../../../.history/src/app/services/calculator-service/calculator.service_20230910163110';
import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  constructor(private CalculatorService: CalculatorService) {}
}
