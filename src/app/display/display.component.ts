import {
    Component,
    Input,
    OnChanges,
    OnInit,
} from '@angular/core';
import { CalculatorService } from '../services/calculator-service/calculator.service';
import {
    Observable,
    map,
} from 'rxjs';
import { CustomResponse } from '../interfaces/custom-response';

@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css'],
})
export class DisplayComponent implements OnInit, OnChanges {

    @Input() refreshDisplay !: CustomResponse

    expression$ !: Observable<string | undefined>

    constructor(private calculatorService: CalculatorService) {}

    ngOnInit(): void {
        this.getExpression();
    }

    ngOnChanges(): void {
        this.getExpression();
    }

    getExpression() {
        this.expression$ = this.calculatorService.expression$.pipe(
            map((expression) => {
                return expression.data.expression;
            })
        );
    }
}
