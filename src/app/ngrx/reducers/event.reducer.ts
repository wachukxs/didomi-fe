import { Action, createReducer, on } from '@ngrx/store';
import { ConsentChangeEvent } from '../../models/Event';
import {
  EventActionTypes,
  addNewEvent,
  retrievedEventsList,
} from '../actions/event.actions';
import { EventState } from '../app.state';

export const initialState: EventState = {
  perferences: [],
};

// #########

export const addEventReducer = createReducer(
  initialState,
  on(addNewEvent, (state: EventState, { perference }) => ({
    perferences: [...state.perferences, perference],
  }))
);

export const eventsInitReducer = createReducer(
  initialState,
  on(retrievedEventsList, (state: EventState, { perferences }) => {
      console.log('____', perferences);
      
      return {
        perferences: [...state.perferences, ...perferences],
      }
  })
);
