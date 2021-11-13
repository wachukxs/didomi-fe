import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EventState } from '../app.state';
import { ConsentChangeEvent } from '../../models/Event';


const selectPerferencesFeature = createFeatureSelector<EventState>('perferences');

export const selectPerferences = createSelector(
    selectPerferencesFeature,
    (_state: EventState) => _state.perferences);
