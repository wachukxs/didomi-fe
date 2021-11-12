import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CallerService } from '../services/caller.service';
import { DeleteAccountDialogComponent } from '../delete-account-dialog/delete-account-dialog.component';

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
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  notificationoptions: string[] = ['sms', 'email'];

  panelOpenState = false;

  user: any = JSON.parse(new String(sessionStorage.getItem('domini_user_details')).toString());
  displayedColumns: string[] = ['age', 'emailNotifications', 'smsNotifications', 'id'];

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

      // should we induce a delay so the api isn't called too much

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

  openDeleteAccountDialog(): void {
    const dialogRef = this.dialog.open(DeleteAccountDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(`Deleteing`);
        this.callerService.deleteUserAccount(this.user.email).subscribe(
          (res: any) => {
            console.log('account delete response', res);
            if (res.status == 200) {
              sessionStorage.removeItem('domini_user_details')
              this.router.navigate(['/']) // show a snack bar, saying we're sorry to see you go
            }
          },
          (err) => {
            console.error('=> account delete  err', err);
            this.openSnackBar(
              "Please try again.",
              'OK'
            );
            
          }
        )
      }
    });
  }
}
