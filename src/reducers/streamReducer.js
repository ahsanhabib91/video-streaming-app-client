import _ from "lodash";
import {
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  EDIT_STREAM,
  DELETE_STREAM
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload }; // action.payload is returning stream object
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload }; // action.payload is returning stream object
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload }; // action.payload is returning stream object
    case DELETE_STREAM:
      return _.omit(state, action.payload); // action.payload is returning stream id only
    default:
      return state;
  }
};
