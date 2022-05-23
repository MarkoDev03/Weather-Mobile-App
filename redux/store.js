import { createStore } from "redux"
import reducers from "./reducers/index"

const configureStore = (initialState) => {
    return createStore(reducers, initialState)
}

export default configureStore