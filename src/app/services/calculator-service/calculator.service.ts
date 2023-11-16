import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

    constructor(private http: HttpClient, @Inject(APP_SERVICE_CONFIG) private config: AppConfig) {}

    getExpression(): Observable<CustomResponse> {
        return this.http.get<CustomResponse>(`${this.API_URL}/expression`);
    }

    solveExpression(): Observable<CustomResponse> {
        return this.http.get<CustomResponse>(`${this.API_URL}/solve`);
    }

    clearExpression(): Observable<CustomResponse> {
        return this.http.get<CustomResponse>(`${this.API_URL}/clear`);
    }

    buildExpression(expression: Expression) {
        return this.http.post<CustomResponse>(
            `${this.API_URL}/build`,
            expression,
            this.httpOptions
        );
    }
}
