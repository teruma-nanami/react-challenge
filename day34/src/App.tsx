import { Route, Routes } from "react-router-dom";
import Layout from "./components/layouts//Layout";
import Category from "./pages/Category";
import Dashboard from "./pages/Dashboard";
import Graph from "./pages/Graph";
import HousekeepAdd from "./pages/HousekeepAdd";
// import HouseKeepEdit from "./pages/HouseKeepEdit";
import HousekeepList from "./pages/HousekeepList";
import Income from "./pages/Income";
import Setting from "./pages/Setting";

function App() {
  return (
    <>
      {/* ページルーティング */}
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Dashboard */}
          <Route index element={<Dashboard />} />

          {/* Housekeep */}
          <Route path="add" element={<HousekeepAdd />} />
          {/* <Route path="edit/:id" element={<HouseKeepEdit />} /> */}
          <Route path="list" element={<HousekeepList />} />

          <Route path="income" element={<Income />} />

          {/* Category */}
          <Route path="category" element={<Category />} />

          {/* Graph */}
          <Route path="graph" element={<Graph />} />

          {/* Setting */}
          <Route path="setting" element={<Setting />} />

          {/* 例: 今後追加予定のページ */}
          {/* <Route path="habits" element={<Habits />} /> */}
          {/* <Route path="someday" element={<Someday />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
