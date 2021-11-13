import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EventState } from '../app.state';
import { ConsentChangeEvent } from '../../models/Event';

export const selectMainAppState = (state: EventState) => state

export const selectPerferences = createSelector(
    selectMainAppState,
    (state: EventState) => state.perferences
);
