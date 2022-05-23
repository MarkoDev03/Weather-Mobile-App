import React from "react";
import Main from "./Main";
import configureStore from "./redux/store";
import { Provider } from "react-redux"

const store = configureStore()

const App = () => {
   return (
     <Provider store={store}>
       <Main />
     </Provider>
   )
}

export default App