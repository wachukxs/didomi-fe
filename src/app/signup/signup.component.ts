import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CallerService } from '../services/caller.service';
import { Store } from '@ngrx/store';
import { clearEvent } from '../ngrx/actions/event.actions';
import { EventState } from '../ngrx/app.state';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private store: Store<EventState>, private router: Router, private callerService: CallerService, private _snackBar: MatSnackBar) { }

  passwordInputIcon: string = 'visibility';

  @ViewChild('passwordInput')
  passwordInput!: ElementRef;

  signUpForm = new FormGroup({
      firstname: new FormControl('', ),
      password: new FormControl('', ),
      email: new FormControl('', [Validators.required, Validators.email]),
      lastname: new FormControl('', ),
      accepttandc: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
  }

  togglePasswordInputIcon(): void {
    
    if (this.passwordInputIcon == 'visibility') {
      this.passwordInputIcon = 'visibility_off'
      this.passwordInput.nativeElement.type = 'text'
    } else {
      this.passwordInputIcon = 'visibility'
      this.passwordInput.nativeElement.type = 'password'
    }
  }

  signUpButtonClick(evt: MouseEvent) {  
    console.log('this.signUpForm', this.signUpForm);
    if (this.signUpForm.valid) {
      this.callerService.signUpUser(this.signUpForm.value).subscribe(
        (res: any) => {
          console.log('sign up response', res);
          if (res.status == 200 && res.statusText === "OK") {

            sessionStorage.setItem('domini_user_details', JSON.stringify(res.body))
            this.store.dispatch(clearEvent());
            this.router.navigate(['/dashboard'])
            
          }
        },
        (err) => {
          console.error('=> err', err);
          
          if (err.status = 400) {
            // set error in email input
            this.signUpForm.get(['email'])?.setErrors({notUnique: true});
          } else {
            // sth happened and we don't know ... we're look into it.
            this.openSnackBar("Oops. Something happened. It's us, not you.", "Close")
          }
        }
      )
    } else {
      console.log('not signing up')
      if (this.signUpForm.get(['accepttandc'])?.status == "INVALID") {
        this.signUpForm.get(['accepttandc'])?.setErrors({notAccepted: true})
      }
    }
  }

  // should be like a central messaging service
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
