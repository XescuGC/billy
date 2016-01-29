const initialState = {
  items: []
}

export default function reducer(state = initialState, action) {
  let { payload } = action;

  switch (action.type) {
    default:
      return state;
      break;
  }
}
