import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EventState } from '../ngrx/app.state';
import { CallerService } from '../services/caller.service';
import { Store } from '@ngrx/store';
import { retrievedEventsList } from '../ngrx/actions/event.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private callerService: CallerService,
    private _snackBar: MatSnackBar,
    private store: Store<EventState>
  ) {}

  loginForm = new FormGroup({
    password: new FormControl('', [ ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  passwordInputIcon: string = 'visibility';

  @ViewChild('passwordInput')
  passwordInput!: ElementRef;

  ngOnInit(): void {}

  togglePasswordInputIcon(): void {
    if (this.passwordInputIcon == 'visibility') {
      this.passwordInputIcon = 'visibility_off';
      this.passwordInput.nativeElement.type = 'text';
    } else {
      this.passwordInputIcon = 'visibility';
      this.passwordInput.nativeElement.type = 'password';
    }
  }

  logInButtonClick(evt: MouseEvent) {
    console.log('errs:', this.loginForm.errors);
    console.log('this.loginForm', this.loginForm);
    if (this.loginForm.valid) {
      this.callerService.logInUser(this.loginForm.value).subscribe(
        (res: any) => {
          console.log('login response', res);
          if (res.status == 200) {
            sessionStorage.setItem(
              'domini_user_details',
              JSON.stringify(res.body)
            );
            this.store.dispatch(retrievedEventsList({
              perferences: res.body.consents, // if it's empty ??
            }));
            this.router.navigate(['/dashboard']);
          }
        },
        (err) => {
          console.error('=> err', err);

          if (err.status == 403) {
            // set error in email input
            this.loginForm.get(['password'])?.setErrors({ invalidValue: true });
          } else if (err.status == 401) {
            this.loginForm.get(['email'])?.setErrors({ invalidValue: true });
          } else if (err.status == 422) {
            this.loginForm.get(['email'])?.setErrors({ invalidValue: true });
          } else {
            // sth happened and we don't know ... we're look into it. shoot out a notification, automated email, etc.
            this.openSnackBar(
              "Oops. Something happened. It's us, not you.",
              'Close'
            );
          }
        }
      );
    } else {
      console.log('not signing up');
    }
  }

  // should be like a central messaging service
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
