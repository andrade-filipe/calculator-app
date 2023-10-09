import { Component, OnInit } from '@angular/core';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { DataState } from '../enums/data-state.enum';
import { CalculatorService } from '../services/calculator-service/calculator.service';
import { AppState } from '../interfaces/app-state';
import { CustomResponse } from '../interfaces/custom-response';

@Component({
  selector: 'app-exception',
  templateUrl: './exception.component.html',
  styleUrls: ['./exception.component.css']
})
export class ExceptionComponent implements OnInit {
    appState$!: Observable<AppState<CustomResponse>>;

    constructor(private calculatorService: CalculatorService) {}

    ngOnInit(): void {
        this.loadApi();
    }

    loadApi() {
        this.appState$ = this.calculatorService.expression$.pipe(
            map((response) => {
                return {
                    dataState: DataState.LOADED_STATE,
                    appData: response,
                };
            }),
            startWith({ dataState: DataState.LOADING_STATE }),
            catchError((error: string) => {
                error = "API cannot be reached";
                return of({ dataState: DataState.ERROR_STATE, error });
            })
        );
    }
}
