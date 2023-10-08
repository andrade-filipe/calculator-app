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
import { Expression } from '../interfaces/expression';

@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css'],
})
export class DisplayComponent implements OnInit, OnChanges {

    @Input() clickedReceptor !: string;

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
    }

    getExpression() {
        this.expression$ = this.calculatorService.expression$.pipe(
            map((response) => {
                return response.data.expression;
            })
        )
    }

    // buildExpression(digit: string): void {
    //     console.log("build");
    //     this.expression = {expression: this.currExpression.expression + digit};
    //     this.calculatorService.build$(this.expression).subscribe(response => this.aux = response);
    //     this.clicked.emit(this.aux);
    // }

    // solveExpression() {
    //     this.calculatorService.solve$.subscribe(response => this.aux = response)
    //     this.clicked.emit(this.aux);
    // }

    // clearExpression() {
    //     this.calculatorService.clear$.subscribe(response => this.aux = response)
    //     this.clicked.emit(this.aux);
    // }
}
