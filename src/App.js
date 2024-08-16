import { BrowserRouter } from "react-router-dom";
import RoutesList from "../src/routes/RoutesList";
import { SnackbarProvider } from "notistack";
import { createRef } from "react";
import { Provider } from "react-redux";
import store from "./redux/Store";

function App() {
  const notistackRef = createRef();
  const snackBarConfig = {
    maxSnack: 5,
    autoHideDuration: 2000,
    preventDuplicate: true,
  };

  return (
    <Provider store={store}>
      <SnackbarProvider
        {...snackBarConfig}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        ref={notistackRef}
      >
        <BrowserRouter>
          <RoutesList />
        </BrowserRouter>
      </SnackbarProvider>
    </Provider>
  );
}
export default App;
