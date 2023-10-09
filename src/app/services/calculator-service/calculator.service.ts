import {
    HttpClient,
    HttpHeaders,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
    Observable,
    catchError,
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
                catchError(() => {
                    return throwError(() => {
                        return new Error("Couldn't load Data")
;                    })
                }),
            );

        this.solve$ = this.http
            .get<CustomResponse>(`${this.API_URL}/solve`)
            .pipe(
                catchError(() => {
                    return throwError(() => {
                        return new Error("Couldn't solve expression")
;                    })
                }),
            );

        this.clear$ = this.http
            .get<CustomResponse>(`${this.API_URL}/clear`)
            .pipe(
                catchError(() => {
                    return throwError(() => {
                        return new Error("Couldn't clear expression")
;                    })
                }),
            );
    }

    build$ = (expression: Expression) =>
        <Observable<CustomResponse>>(
            this.http
                .post<CustomResponse>(`${this.API_URL}/build`, expression)
                .pipe(
                    catchError(() => {
                        return throwError(() => {
                            return new Error("Couldn't build expression")
    ;                    })
                    }),
                )
        );

    buildExpression(expression: Expression) {
        this.build$(expression).subscribe();
    }
}
