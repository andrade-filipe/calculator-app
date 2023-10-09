import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

  constructor(private snackbar: MatSnackBar) {}

  handleError(error: unknown) {
    this.snackbar.open(
        "Error Found",
        "Close",
        {
            duration: 3000
        }
    );

    console.warn(`Error Caught: `, error);
  }

}
