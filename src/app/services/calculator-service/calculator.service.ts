import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, distinctUntilChanged, of, repeat, shareReplay, tap, throwError } from 'rxjs';
import { AppConfig } from 'src/app/app-config/app-config.interface';
import { APP_SERVICE_CONFIG } from 'src/app/app-config/app-config.service';
import { CustomResponse } from 'src/app/interfaces/custom-response';
import { Expression } from 'src/app/interfaces/expression';

@Injectable({
    providedIn: 'root',
})
export class CalculatorService {
    readonly API_URL: string = `${this.config.apiUrl}/api/v1`;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(
        private http: HttpClient,
        @Inject(APP_SERVICE_CONFIG) private config: AppConfig
    ) {
        console.log('Initialized...');
    }

    expression$ = <Observable<CustomResponse>>(
        this.http
            .get<CustomResponse>(`${this.API_URL}/expression`)
            .pipe(
                tap(console.log),
                catchError(this.handleError))
    );

    build$ = (expression: Expression) =>
        <Observable<CustomResponse>>(
            this.http
                .post<CustomResponse>(`${this.API_URL}/build`, expression)
                .pipe(tap(console.log), catchError(this.handleError))
        );

    solve$ = <Observable<CustomResponse>>(
        this.http
            .get<CustomResponse>(`${this.API_URL}/solve`)
            .pipe(tap(console.log), catchError(this.handleError))
    );

    clear$ = <Observable<CustomResponse>>(
        this.http
            .get<CustomResponse>(`${this.API_URL}/clear`)
            .pipe(tap(console.log), catchError(this.handleError))
    );

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     */
    private handleError(error: HttpErrorResponse): Observable<never> {
        return throwError(() => new Error(`Error code: ${error.status}`));
    }
}
