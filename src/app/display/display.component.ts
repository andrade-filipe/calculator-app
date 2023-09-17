import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../services/calculator-service/calculator.service';
import {
    Observable,
    distinctUntilChanged,
    map,
} from 'rxjs';
import { CustomResponse } from '../interfaces/custom-response';

@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css'],
})
export class DisplayComponent implements OnInit {
    expression$ !: Observable<string | undefined>;

    constructor(private calculatorService: CalculatorService) {}

    ngOnInit(): void {
        this.expression$ = this.calculatorService
        .expression$
        .pipe(
            distinctUntilChanged(),
            map(response => {
                return response.data.expression
            }
        ));
    }
}
