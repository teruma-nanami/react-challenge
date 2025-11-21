import { Route, Routes } from "react-router";
import About from "./pages/About";
// import EditMemo from "./pages/EditMemo";
import Layout from "./layouts/Layout";
import { Home } from "./pages/Home";
import NewMemo from "./pages/NewMemo";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/new" element={<NewMemo />} />
          {/* <Route path="/edit/:id" element={<EditMemo />} />*/}
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
