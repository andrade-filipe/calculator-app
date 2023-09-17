import { CalculatorService } from './../../.history/src/app/services/calculator-service/calculator.service_20230916115029';
import { Component, OnInit } from '@angular/core';
import { AppState } from './interfaces/app-state';
import { CustomResponse } from './interfaces/custom-response';
import { Observable } from 'rxjs';
import { DataState } from './enums/data-state.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    appState$: Observable<AppState<CustomResponse>>;

    constructor(private calculatorService: CalculatorService) {}

    ngOnInit(): void {
        this.appState$ = this.calculatorService.expression$
        .pipe(
            map(response => {
                return {
                    dataState: DataState.LOADED_STATE,
                    appData: response }
            })
        )
    }
}
