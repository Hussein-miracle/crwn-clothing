import { createStore , applyMiddleware } from "redux";
import {persistStore} from  "redux-persist";
import thunk from "redux-thunk";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middlewares = [thunk];

if(process.env.NODE_ENV === "development"){
    middlewares.push(logger)
}

export const store = createStore ( rootReducer , applyMiddleware(...middlewares)) ;  //we simply destructor the middlewares bcos this makes the app scalable.

export const persistor = persistStore(store);

