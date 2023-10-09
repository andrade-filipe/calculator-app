import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

  constructor(private snackbar: MatSnackBar, private zone: NgZone) {}

  handleError(error: unknown) {
    this.zone.run(() => {
        this.snackbar.open(
            "Error Found",
            "Close",
            {
                duration: 3000
            }
        );
    })
    console.warn(`Error Caught: `, error);
  }
}
