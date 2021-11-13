import { Action, createReducer, on } from '@ngrx/store';
import { ConsentChangeEvent } from '../../models/Event';
import {
  EventActionTypes,
  addNewEvent,
  retrievedEventsList,
  clearEvent
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
  })),
  on(clearEvent, (state: EventState) => ({
    perferences: [],
  })),
  on(retrievedEventsList, (state: EventState, { perferences }) => ({
    perferences: [...perferences],
  }))
);

