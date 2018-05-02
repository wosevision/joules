import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MethodsService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  send(path: string, message?) {
    return this.http
      .post<{ message?; error?: Error }>(`/api/${path}`, message ? { message } : {})
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
