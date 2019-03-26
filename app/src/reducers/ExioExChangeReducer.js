import {handleActions} from 'redux-actions';

const initialState = {
  events: [],
};

export const ExioExChangeReducer = handleActions({
  ADD_EXIOEXCHANGE_EVENT: (state, { payload: { event } }) => {
    return {
      events: [...state.events, event],
    };
  },
}, initialState);
