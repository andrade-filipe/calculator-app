import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_CONFIG, APP_SERVICE_CONFIG } from './app-config/app-config.service';
import { FormsModule } from '@angular/forms';
import { CalculatorComponent } from './calculator/calculator.component';
import { PadComponent } from './pad/pad.component';
import { DisplayComponent } from './display/display.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomErrorHandler } from './services/custom-error-handler/custom-error-handler.service';
import { GlobalHttpErrorHandler } from './interceptors/global-http-error-handler.interceptor';
@NgModule({
    declarations: [AppComponent, CalculatorComponent, PadComponent, DisplayComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
    ],
    providers: [
        {
            provide: APP_SERVICE_CONFIG,
            useValue: APP_CONFIG,
        },
        {
            provide: ErrorHandler,
            useClass: CustomErrorHandler,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: GlobalHttpErrorHandler,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
