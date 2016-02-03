import { UPDATE_PATH } from 'redux-simple-router'

export default function reducer(state={}, action) {
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
