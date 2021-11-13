import { Action, createReducer, on } from '@ngrx/store';
import { ConsentChangeEvent } from '../../models/Event';
import {
  EventActionTypes,
  // addEvent,
  addNewEvent,
  retrievedEventsList,
} from '../actions/event.actions';
import { EventState } from '../app.state';

class AddEventAction implements Action {
  // https://stackoverflow.com/a/66265684/9259701
  readonly type = EventActionTypes.ADD_EVENT;
  constructor(public payload: Array<ConsentChangeEvent>) {}
}

export const initialState: EventState = {
  perferences: [],
};

// export function newEventReducer(
//   state: ConsentChangeEvent[] = initialState,
//   action: AddEventAction
// ): Array<ConsentChangeEvent> {
//   // might change action type
//   switch (action.type) {
//     case EventActionTypes.ADD_EVENT:
//       console.log('new action');
//       console.log('state', state, 'action', action);
//       return [...state, ...action.payload];
//     default:
//       // for initializing
//       return [...state];
//   }
// }

// #########

export const addEventReducer = createReducer(
  initialState,
  on(addNewEvent, (state: EventState, { perference }) => {
    console.log('++++', state, perference);

    return { perferences: [...state.perferences, perference] };
  })
);

export const eventsInitReducer = createReducer(
  initialState,
  on(retrievedEventsList, (state: EventState, { perferences }) => ({
    perferences: [...perferences],
  }))
);

// export function reducer(state: EventState | undefined, action: Action): any {
//   return customerReducer(state, action);
// }
