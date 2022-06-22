import { REMOVE_ALERT, SET_ALERT } from "../actions/type";

const initialState = [];

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  
  switch (type) {
    case SET_ALERT:
      return [...state, payload]; //payload: alert{}
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
