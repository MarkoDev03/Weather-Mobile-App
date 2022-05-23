import dataReducer from "./dataReducer";
import { combineReducers } from "redux"

const reducers = combineReducers({
    dataReducer: dataReducer
})

const rootReducer = (state, action) => {
    return reducers(state, action)
}

export default rootReducer