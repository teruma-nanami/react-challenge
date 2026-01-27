import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Contacts from "./pages/Contacts";
import Tasks from "./pages/Tasks";
import BillingRequestList from "./pages/BilingRequestList";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Layout from "./layouts/Layout";
import ContactList from "./pages/ContactList";
import ContactDetail from "./pages/ContactDetail";
import Inventory from "./pages/Inventory";
import InventoryDetail from "./pages/InventoryDetail";
import Attendance from "./pages/Attendance";
import BillingRequestCreate from "./pages/BillingRequestCreate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 初期遷移 */}
        <Route path="/" element={<Navigate to="/contacts" replace />} />

        {/* ログイン（Layoutなし） */}
        <Route path="/login" element={<Login />} />

        {/* Layoutありのページ群 */}
        <Route
          path="/contacts"
          element={
            <Layout>
              <Contacts />
            </Layout>
          }
        />
        <Route
          path="/contacts/list"
          element={
            <Layout>
              <ContactList />
            </Layout>
          }
        />

        <Route
          path="/contacts/:id"
          element={
            <Layout>
              <ContactDetail />
            </Layout>
          }
        />
        <Route
          path="/tasks"
          element={
            <Layout>
              <Tasks />
            </Layout>
          }
        />
        <Route
          path="/requests"
          element={
            <Layout>
              <BillingRequestList />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        <Route
          path="/inventory"
          element={
            <Layout>
              <Inventory />
            </Layout>
          }
        />

        <Route
          path="/inventory/:id"
          element={
            <Layout>
              <InventoryDetail />
            </Layout>
          }
        />
        <Route
          path="/attendance"
          element={
            <Layout>
              <Attendance />
            </Layout>
          }
        />

        <Route
          path="/requests/new"
          element={
            <Layout>
              <BillingRequestCreate />
            </Layout>
          }
        />
        {/* 404 */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
