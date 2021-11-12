import { createAction, props } from '@ngrx/store';
import { ConsentChangeEvent } from '../../models/Event';

export enum EventActionTypes {
  ADD_EVENT = '[Event] New event perference',
  INITIALIZE_EVENT = '[Event] Retrieve Events',
  ADD_EVENT_V2 = '[Event List/API] Add Event',
  INITIALIZE_EVENT_V2 = '[Event List/API] Retrieve Events Success',
}

// #####

export const addEvent = createAction(
  EventActionTypes.ADD_EVENT,
  (event: ConsentChangeEvent) => ({ event })
);

// #####

export const addNewEvent = createAction(
  EventActionTypes.ADD_EVENT_V2,
  props<{ event: ConsentChangeEvent }>()
);

export const retrievedEventsList = createAction(
  EventActionTypes.INITIALIZE_EVENT_V2,
  props<{ events: ReadonlyArray<ConsentChangeEvent> }>()
);
