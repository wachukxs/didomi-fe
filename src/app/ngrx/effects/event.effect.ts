import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CallerService } from '../../services/caller.service';
import { Injectable } from '@angular/core';
import { catchError, map, switchMap, concatMap, tap } from 'rxjs/operators';
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
          this.callerService.updateUserConsentPreference(data).pipe(
            tap((res) => console.log(`BEFORE MAP:`, res.body)),
            map((res) => ({type: EventActionTypes.ADD_EVENT_V2, perference: res.body }) ),

            catchError(() => of(newEventChangeError())),
            catchError(() => EMPTY),
          )

        // this.callerService.updateUserConsentPreference(data).subscribe({
        //     // on successful emissions
        //     next: (res) => addNewEvent( { perference: res.body } ),
        //     // on errors
        //     error: (error) => of(newEventChangeError()),
        //     // called once on completion
        //     complete: () => console.log('complete!')
        // })
      )
    )
  );
}
