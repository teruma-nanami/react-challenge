import "./App.css";
import { Header } from "./components/templates/Header";
import "./index.css";
import { AppRouter } from "./router/Router";

function App() {
  return (
    <>
      <Header />
      <AppRouter />
    </>
  );
}

export default App;
