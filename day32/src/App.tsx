import { Route, Routes } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import HabitCreate from "./pages/HabitCreate";
import Habits from "./pages/Habits";
import Someday from "./pages/Someday";
import Today from "./pages/Today";

import "./App.css";

function App() {
  return (
    <>
      {/* ページルーティング */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Today />} />
          <Route path="habits" element={<Habits />} />
          <Route path="habit-create" element={<HabitCreate />} />
          <Route path="someday" element={<Someday />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
