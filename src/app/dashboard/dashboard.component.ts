import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CallerService } from '../services/caller.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private callerService: CallerService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  notificationoptions: string[] = ['sms', 'email'];

  user: any = JSON.parse(new String(sessionStorage.getItem('domini_user_details')).toString());

  consentFormGroup = new FormGroup({
    // buggy // https://stackoverflow.com/a/65165250/9259701
    // consentoptions: new FormGroup(
    //   Object.assign(
    //     {},
    //     ...Array.from(this.notificationoptions, (v) => ({ [v]: false }))
    //   ),
    //   [] // validators
    // ),
    consentoptions: this.formBuilder.group(
      Object.assign({}, ...Array.from(this.notificationoptions, (v) => ({[v]: false}) ))
    , [Validators.required]),
    email: new FormControl(this.user?.email, [Validators.required, Validators.email]),
    userid: new FormControl(this.user?.id, [Validators.required]),
  });

  ngOnInit(): void {

    this.consentFormGroup.valueChanges.subscribe((value) => {
      console.log(value);

      this.callerService.updateUserConsentPreference(value).subscribe(
        (res: any) => {
          console.log('event update response', res);
          if (res.status == 200) {
            this.openSnackBar(
              "Preference updated.",
              'OK'
            );
          }
        },
        (err) => {
          console.error('=> err', err);
          this.openSnackBar(
            "Please try again.",
            'OK'
          );
          
        }
      )
    }, (err) => {
      console.error('jeez', err);
    })
  }

  get consentOptionsFormGroup(): FormGroup {
    return this.consentFormGroup.get(['consentoptions']) as FormGroup;
    // return this.consentFormGroup.controls['consentoptions'] as FormGroup;
  }

  // should be like a central messaging service
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
