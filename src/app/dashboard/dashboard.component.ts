import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { Store } from '@ngrx/store';
import { ConsentChangeEvent } from '../models/Event';
import { EventState } from '../ngrx/app.state';
import { BehaviorSubject, Observable } from 'rxjs';
import { EventActionTypes } from '../ngrx/actions/event.actions';
import { debounceTime, filter, map, tap } from 'rxjs/operators';
import { selectPerferences } from '../ngrx/selectors/event.selector';
import {
  newEventChange,
  retrievedEventsList,
} from '../ngrx/actions/event.actions';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';



export class PerferenceTableDataSource implements DataSource<ConsentChangeEvent> {
  totalPerference: number = 0
  constructor(private store: Store<EventState>) { }

  private lessonsSubject = new BehaviorSubject<ConsentChangeEvent[]>([]);
  
  connect(collectionViewer: CollectionViewer): Observable<ConsentChangeEvent[]> {
    return this.lessonsSubject.asObservable() // this.store.select((state) => selectPerferences(state))
  }

  loadDataSubset(start: number = 0, end: number = 5, size: number = 0) {
    this.store.select((state) => selectPerferences(state))
    .subscribe(p => {
      this.totalPerference = p.length
      console.log('breee', p.slice(start, end));
      this.lessonsSubject.next(p.slice(start, end))
    })
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.store.complete()
  }
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  // eventsTrail$: Observable<Array<ConsentChangeEvent>>; // MatTableDataSource will alredy produce an array

  dataSource: PerferenceTableDataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private callerService: CallerService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private store: Store<EventState>
  ) {
    
    // this.eventsTrail$ = this.store.select((state) => selectPerferences(state));

    this.dataSource = new PerferenceTableDataSource(this.store);

    this.store.select((state) => selectPerferences(state)).subscribe(val => {
      console.log('everr', val);
    })
    
  }

     ngAfterViewInit() {

      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
      this.paginator.page
            .pipe(
                tap((d) => {
                  this.dataSource.loadDataSubset((d.pageIndex * d.pageSize), (d.pageIndex * d.pageSize) + d.pageSize)
                })
            )
            .subscribe();
    }

  _addNewEvent(notification: string, value: boolean) {
    this.store.dispatch(
      newEventChange({
        perference: {
          id: notification,
          enabled: value,
          userEmail: this.user.email,
          userId: this.user.id,
        },
      })
    );
  }

  notificationoptions: string[] = ['sms', 'email'];

  panelOpenState = false;

  user: any = JSON.parse(
    new String(sessionStorage.getItem('domini_user_details')).toString()
  );
  displayedColumns: string[] = ['sn', 'age', 'id', 'enabled'];

  email_notifications = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  sms_notifications = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    console.log('this.user.consents', this.user.consents);
    this.dataSource.loadDataSubset()

    this.email_notifications.valueChanges.pipe(debounceTime(500)).subscribe(
      (value) => {
        console.log(value);

        this._addNewEvent('email_notifications', value);

        // should we induce a delay so the api isn't called too much

        /* this.callerService.updateUserConsentPreference(value).subscribe(
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
      ) */
      },
      (err) => {
        console.error('jeez', err);
      }
    );

    this.sms_notifications.valueChanges.pipe(debounceTime(500)).subscribe(
      (value) => {
        console.log(value);

        this._addNewEvent('sms_notifications', value);
      },
      (err) => {
        console.error('jeez', err);
      }
    );

    if (this.user.consents) {
      // this.store.dispatch({
      //   type: EventActionTypes.INITIALIZE_EVENT_V2,
      //   perferences: this.user.consents,
      // });

      this.store.dispatch(
        retrievedEventsList({ perferences: this.user.consents })
      );
    }
  }

  // should be like a central messaging service
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ngOnDestroy() { // close any open snackbar
    this._snackBar._openedSnackBarRef?.dismiss()
  }

  openDeleteAccountDialog(): void {
    const dialogRef = this.dialog.open(DeleteAccountDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(`Deleteing`);
        this.callerService.deleteUserAccount(this.user.email).subscribe(
          (res: any) => {
            console.log('account delete response', res);
            if (res.status == 200) {
              sessionStorage.removeItem('domini_user_details');
              this.router.navigate(['/']); // show a snack bar, saying we're sorry to see you go
            }
          },
          (err) => {
            console.error('=> account delete  err', err);
            this.openSnackBar('Please try again.', 'OK');
          }
        );
      }
    });
  }
}
