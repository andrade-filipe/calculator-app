import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
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

    @Output() currExpression = new EventEmitter<Expression>;

    expression$ !: Observable<string | undefined>;

    expression !: Expression;

    constructor(private calculatorService: CalculatorService) {}

    ngOnInit(): void {
        this.onKey('');
        this.getExpression();

    }

    ngOnChanges(): void {
        this.getExpression();
    }

    onKey(value: string) {
        this.expression = {expression: value};
        this.calculatorService.build$(this.expression).subscribe();
        this.currExpression.emit(this.expression);
    }

    getExpression() {
        this.expression$ = this.calculatorService.expression$.pipe(
            map((response) => {
                return response.data.expression;
            })
        )
    }
}
