import { createAction, props } from '@ngrx/store';
import { ConsentChangeEvent } from '../../models/Event';

export enum EventActionTypes {
  ADD_EVENT = '[Event] Add New event perference',
  EMPTY_EVENT = '[Event] Clear event perference',
  ADD_EVENT_ERROR = '[Event] Add New event perference error',
  NEW_EVENT_CHANGE = '[Event] New event perference',
  INITIALIZE_EVENT = '[Event] Retrieve Events',
  ADD_EVENT_V2 = '[Event List/API] Add Event',
  INITIALIZE_EVENT_V2 = '[Event List/API] Retrieve Events Success',
}

// #####

// export const addEvent = createAction(
//   EventActionTypes.ADD_EVENT,
//   (event: ConsentChangeEvent) => ({ event }) // extracting event from event ??
// );

// #####

export const addNewEvent = createAction(
  EventActionTypes.ADD_EVENT_V2,
  props<{ perference: ConsentChangeEvent }>()
);

export const newEventChange = createAction(
  EventActionTypes.NEW_EVENT_CHANGE,
  props<{ perference: ConsentChangeEvent }>()
);

export const clearEvent = createAction(
  EventActionTypes.EMPTY_EVENT,
  props<{ perference: ConsentChangeEvent }>()
);

export const newEventChangeError = createAction(
  EventActionTypes.ADD_EVENT_ERROR,
);

export const retrievedEventsList = createAction(
  EventActionTypes.INITIALIZE_EVENT_V2,
  props<{ perferences: ReadonlyArray<ConsentChangeEvent> }>()
);
