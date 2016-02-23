export default function pipeReducer (state, func) { return func(state, this.payload, this.action) };
