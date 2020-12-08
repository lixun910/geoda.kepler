import {createAction, handleActions} from 'redux-actions';
import KeplerGlSchema from 'kepler.gl/schemas';
import {INIT, SET_MAP_CONFIG, SHOW_MODAL} from '../actions/actions'


// INITIAL_STATE
export const initialState = {
    appName: 'geoda.js',
    loaded: false,
    modal: null,
    file_ids : {}
};

// REDUCER
const appReducer = handleActions(
    {
      [INIT]: (state, action) => ({
        ...state,
        loaded: true
      }),
      [SET_MAP_CONFIG]: (state, action) => ({
        ...state,
        mapConfig: KeplerGlSchema.getConfigToSave(action.payload)
      }),
      [SHOW_MODAL]: (state, action) => ({
        ...state,
        modal: action.payload
      })
    },
    initialState
);

export default appReducer;