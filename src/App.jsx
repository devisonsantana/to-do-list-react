import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { AppContextProvider } from "./contexts/";
import 'bootstrap-icons/font/bootstrap-icons.css'


const App = () => {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AppContextProvider>
  );
};

export default App;
