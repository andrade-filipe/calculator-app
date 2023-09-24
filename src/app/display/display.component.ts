import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
} from '@angular/core';
import { CalculatorService } from '../services/calculator-service/calculator.service';
import {
    Observable,
    map,
} from 'rxjs';

@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css'],
})
export class DisplayComponent implements OnInit {

    expression$ !: Observable<string | undefined>

    constructor(private calculatorService: CalculatorService) {}

    ngOnInit(): void {
        this.getExpression()
    }

    getExpression() {
        this.expression$ = this.calculatorService.expression$.pipe(
            map((expression) => {
                return expression.data.expression
            })
        );
    }
}
