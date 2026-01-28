import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Contacts from "./pages/Contacts";
import AttendancePage from "./pages/Attendance";
import ContactList from "./pages/ContactList";
import ContactDetail from "./pages/ContactDetail";
import Tasks from "./pages/Tasks";
import Inventory from "./pages/Inventory";
import Profile from "./pages/Profile";
import Layout from "./layouts/Layout";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return null;
  }

  return (
    <Routes>
      {/* 外部：未ログイン可 */}
      <Route
        path="/contacts"
        element={
          <Layout>
            <Contacts />
          </Layout>
        }
      />

      {/* 社内：ログイン必須 */}
      {isAuthenticated && (
        <>
          <Route
            path="/attendance"
            element={
              <Layout>
                <AttendancePage />
              </Layout>
            }
          />

          <Route
            path="/contacts/internal"
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
            path="/inventory"
            element={
              <Layout>
                <Inventory />
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
        </>
      )}

      <Route path="*" element={<Navigate to="/contacts" replace />} />
    </Routes>
  );
}

export default App;
