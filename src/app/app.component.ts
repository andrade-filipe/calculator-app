import { Component, OnInit } from '@angular/core';
import { AppState } from './interfaces/app-state';
import { CustomResponse } from './interfaces/custom-response';
import { Observable, catchError, startWith, of, map } from 'rxjs';
import { DataState } from './enums/data-state.enum';
import { CalculatorService } from './services/calculator-service/calculator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    appState$ !: Observable<AppState<CustomResponse>>;

    constructor(private calculatorService: CalculatorService) {}

    ngOnInit(): void {
        this.appState$ = this.calculatorService.expression$
        .pipe(
            map(response => {
                return {
                    dataState: DataState.LOADED_STATE,
                    appData: response }
            }),
            startWith({ dataState: DataState.LOADING_STATE }),
            catchError((error: string) => {
                return of({dataState: DataState.ERROR_STATE, error })
            })
        )
    }
}
