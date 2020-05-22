
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import history from "../../History";
import reducer from "./reducer";

export default combineReducers({
  reducer,
  router: connectRouter(history)
});