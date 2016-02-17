import * as ActionTypes from '../constants/Config';

export function loadConfig(config) {
  return { type: ActionTypes.LOAD_CONFIG, payload: { config } };
}
