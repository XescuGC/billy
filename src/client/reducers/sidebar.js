import { UPDATE_PATH } from 'redux-simple-router'

const initialState = { };

export default function reducer(state=initialState, action) {
  let { payload } = action;

  switch (action.type) {
    case UPDATE_PATH:
      let slug = payload.path.split('/')[1];
      return state.map( r => {
        if (r.slug === slug) { r.active = true  }
        else                 { r.active = false }
        return r;
      })
      return state;
      break;

    default:
      return state;
      break;
  }
}
