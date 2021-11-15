import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CallerService } from '../../services/caller.service';
import { Injectable } from '@angular/core';
import { catchError, map, switchMap, concatMap, tap, filter } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';
import {
  addNewEvent,
  retrievedEventsList,
  newEventChange,
  newEventChangeError,
  EventActionTypes,
} from '../actions/event.actions';
import { Store } from '@ngrx/store';
import { EventState } from '../app.state';

@Injectable()
export class EventEffects {
  constructor(
    private actions$: Actions, // this is an RxJS stream of all actions
    private callerService: CallerService, // we will need this service for API calls
    private store: Store<EventState>
  ) {}

  loadPerferences$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newEventChange),
      concatMap(
        (data) =>
          this.callerService.updateUserConsentPreference(data).pipe( // use subscribe
            tap((res) => console.log(`BEFORE MAP:`, res.body)),
            filter(res => res.status == 200),
            map((res) => ({type: EventActionTypes.ADD_EVENT_V2, perference: res.body }) ),
            tap(() => this.callerService.openSnackBar()),
            // catchError(() => of(newEventChangeError())),
            // catchError(() => EMPTY),
          )
      )
    )
  );
}
