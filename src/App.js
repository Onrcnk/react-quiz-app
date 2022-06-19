import React from "react";
import Main from "./components/Main";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <div>
        <Main />
      </div>
    </Provider>
  );
}
