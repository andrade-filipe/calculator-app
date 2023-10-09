import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
    Observable,
    catchError,
    tap,
    throwError,
} from 'rxjs';
import { AppConfig } from 'src/app/app-config/app-config.interface';
import { APP_SERVICE_CONFIG } from 'src/app/app-config/app-config.service';
import { CustomResponse } from 'src/app/interfaces/custom-response';
import { Expression } from 'src/app/interfaces/expression';

@Injectable({
    providedIn: 'root',
})
export class CalculatorService {
    public expression$!: Observable<CustomResponse>;

    public solve$!: Observable<CustomResponse>;

    public clear$!: Observable<CustomResponse>;

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
        this.expression$ = this.http
            .get<CustomResponse>(`${this.API_URL}/expression`)
            .pipe(
                catchError(this.handleError),
            );

        this.solve$ = this.http
            .get<CustomResponse>(`${this.API_URL}/solve`)
            .pipe(
                catchError(this.handleError)
            );

        this.clear$ = this.http
            .get<CustomResponse>(`${this.API_URL}/clear`)
            .pipe(
                catchError(this.handleError)
            );
    }

    build$ = (expression: Expression) =>
        <Observable<CustomResponse>>(
            this.http
                .post<CustomResponse>(`${this.API_URL}/build`, expression)
                .pipe(
                    catchError(this.handleError)
                )
        );

    buildExpression(expression: Expression) {
        this.build$(expression).subscribe();
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     */
    private handleError(error: HttpErrorResponse): Observable<never> {
        return throwError(() => new Error(`Error code: ${error.status}`));
    }
}
