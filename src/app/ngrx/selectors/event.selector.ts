import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EventState } from '../app.state';
import { ConsentChangeEvent } from '../../models/Event';

export const selectPerferencesFeature = (state: EventState) => state.perferences

export const selectPerferences = createSelector(
    selectPerferencesFeature,
    (_state: any) => {
        console.log('_perferences', _state.perferences);
        return _state.perferences
    }
);
