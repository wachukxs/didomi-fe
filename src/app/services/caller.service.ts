import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UserSignUpDetails, UserLoginDetails } from '../models/User';
import { URLPaths } from '../utils/constants.utils';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CallerService {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  private httpOptions = { // maybe add timeout later
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      // Authorization: 'my-auth-token'
    }),
    observe: 'response' as const,
    responseType: 'json' as const,
  };

  private handleError(error: HttpErrorResponse) {
    console.error('got this error', error);
    
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(error);
      
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.

    return throwError(error); // 'Something bad happened; please try again later.'
  }

  signUpUser(userDetails: UserSignUpDetails): Observable<any> {
    console.log('signing up via', environment.baseURL + URLPaths.userSignUp);
    
    return this.http.post(environment.baseURL + URLPaths.userSignUp, userDetails, this.httpOptions)
    .pipe(
      retry(1), // retry a failed request once
      catchError(this.handleError) // then handle the error
    );
  }

  logInUser(userDetails: UserLoginDetails): Observable<any> {
    console.log('logging in up via', environment.baseURL + URLPaths.userLogIn);
    
    return this.http.post(environment.baseURL + URLPaths.userLogIn, userDetails, this.httpOptions)
    .pipe(
      retry(1), // retry a failed request once
      catchError(this.handleError) // then handle the error
    );
  }

  updateUserConsentPreference(userDetails: any): Observable<any> {
    console.log('updating user consent perference', environment.baseURL + URLPaths.newUserEvent);
    
    return this.http.post(environment.baseURL + URLPaths.newUserEvent, userDetails, this.httpOptions)
    .pipe(
      retry(1), // retry a failed request once
      catchError(this.handleError) // then handle the error
    );
  }

  deleteUserAccount(userEmail: string): Observable<any> {
    console.log('deleting user account', environment.baseURL + URLPaths.deleteUser + userEmail);
    
    return this.http.delete(environment.baseURL + URLPaths.deleteUser + userEmail, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError) // then handle the error
    );
  }

  logOutUser(): Observable<any> {
    console.log('logging out via', environment.baseURL + URLPaths.userLogOut);
    
    return this.http.get(environment.baseURL + URLPaths.userLogOut, this.httpOptions)
    .pipe(
      retry(1), // retry a failed request once
      catchError(this.handleError) // then handle the error
    );
  }

  openSnackBar() {
    this._snackBar.open(
      "Preference updated.",
      'OK'
    );
    // this._snackBar.open(message, action);
  }
}
