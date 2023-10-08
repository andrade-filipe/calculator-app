import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { CalculatorService } from '../services/calculator-service/calculator.service';
import {
    Observable,
    map,
} from 'rxjs';
import { CustomResponse } from '../interfaces/custom-response';
import { Expression } from '../interfaces/expression';

@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css'],
})
export class DisplayComponent implements OnInit, OnChanges {

    @Input() refreshDisplay !: CustomResponse;

    @Input() concatenate !: string;

    expression$ !: Observable<string | undefined>;

    expression : Expression = {expression: ''};

    constructor(private calculatorService: CalculatorService) {}

    ngOnInit(): void {
        this.calculatorService.clear$.subscribe();
        this.getExpression();
    }

    ngOnChanges(): void {
        this.getExpression();
    }

    onKey(value: string | undefined) {
        this.expression = {expression: value};
        this.calculatorService.build$(this.expression).subscribe();
    }

    getExpression() {
        this.expression$ = this.calculatorService.expression$.pipe(
            map((expression) => {
                return expression.data.expression;
            })
        );
    }
}
