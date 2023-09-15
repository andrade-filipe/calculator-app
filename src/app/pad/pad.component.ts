import { Component } from '@angular/core';
import { CalculatorService } from '../services/calculator-service/calculator.service'

@Component({
  selector: 'app-pad',
  templateUrl: './pad.component.html',
  styleUrls: ['./pad.component.css']
})
export class PadComponent {

  constructor(private calculatorService: CalculatorService) {}

  buildExpression(digit: string): void {
    this.calculatorService.buildExpression(digit).subscribe();
  }

  solveExpression() {
      this.calculatorService.solveExpression().subscribe();
  }

  clearExpression(){
      this.calculatorService.clearExpression().subscribe();
  }
}
