let initialState = {
  items: []
}

export default function reducer(state={}, action) {
  let { payload } = action;

  switch (action.type) {

    default:
      return state;
      break;
  }
}
