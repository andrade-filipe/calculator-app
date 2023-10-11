import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

  constructor(private snackbar: MatSnackBar, private zone: NgZone) {}

  handleError(error: unknown) {
    this.zone.run(() => {
        if (error instanceof Error){
            this.snackbar.open(
                error.message,
                "Close",
                {
                    duration: 3000
                }
            );
        } else {
            this.snackbar.open(
                "System Failed, we are working on it",
                "Close",
                {
                    duration: 3000
                }
            );
        }
    })
    console.warn(error);
  }
}
