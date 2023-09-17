import { Component } from '@angular/core';
import { CalculatorService } from '../services/calculator-service/calculator.service'

@Component({
  selector: 'app-pad',
  templateUrl: './pad.component.html',
  styleUrls: ['./pad.component.css']
})
export class PadComponent {

  constructor(private calculatorService: CalculatorService) {}

  buildExpression(expression: string): void {
  }

  solveExpression() {
      this.calculatorService.solve$.subscribe();
  }

  clearExpression(){
      this.calculatorService.clear$.subscribe();
  }
}
