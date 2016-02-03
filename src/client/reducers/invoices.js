let initialStaet = {
  items: []
};

export default function reducer(state=initialStaet, action) {
  let { payload } = action;

  switch (action.type) {
    default:
      return state;
      break;
  }
}
