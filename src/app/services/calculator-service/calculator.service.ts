import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { AppConfig } from 'src/app/app-config/app-config.interface';
import { APP_SERVICE_CONFIG } from 'src/app/app-config/app-config.service';
import { MessageService } from '../message-service/message.service';

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
    private messageService: MessageService,
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig
  ) {
    console.log('Initialized...');
  }

  getExpression(): Observable<string> {
    return this.http.get<string>(this.API_URL).pipe(
      tap((_) => this.log('getExpression successful')),
      catchError(this.handleError<string>('getExpression'))
    );
  }

  buildExpression(digit: string): Observable<string> {
    return this.http.post<string>(this.API_URL, digit, this.httpOptions).pipe(
      tap((_) => this.log(`digit passed digit=${digit}`)),
      catchError(this.handleError<any>('buildExpression'))
    );
  }

  solveExpression(): Observable<string> {
    return this.http.get<string>(`${this.API_URL}/solve`).pipe(
      tap((_) => this.log(`expression passed`)),
      catchError(this.handleError<string>('solveExpression'))
    );
  }

  clearExpression(): Observable<string> {
    return this.http.get<string>(`${this.API_URL}/clear`).pipe(
      tap((_) => this.log(`expression clear`)),
      catchError(this.handleError<string>('clearExpression'))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`AppService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
