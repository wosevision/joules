import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export const enum Method {
  Mock = 'mock',
  Clear = 'clear',
  SingleLine = 'single-line',
  MultiLine = 'multi-line',
  Clock = 'clock'
}

@Injectable({
  providedIn: 'root'
})
export class MethodsService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  send(method: Method, message?) {
    return this.http
      .post<{ message?; error?: Error }>(`/api/${method}`, message ? { message } : {})
      .pipe(
        catchError(result => {
          if (result.error) {
            console.error(result.error);
          }
          return of(result.message ? result : { message: 'Failed' });
        }),
        tap(result => {
          this.snackBar.open(result.message || result, 'Youuuuu got it!', { duration: 5000 });
        })
      );
  }
}
