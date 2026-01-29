import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Contacts from "./pages/Contacts";
import AttendancePage from "./pages/Attendance";
import ContactList from "./pages/ContactList";
import ContactDetail from "./pages/ContactDetail";
import Tasks from "./pages/Tasks";
import Inventory from "./pages/Inventory";
import InventoryDetail from "./pages/InventoryDetail";
import Profile from "./pages/Profile";
import Layout from "./layouts/Layout";
import { setAccessToken } from "./lib/api";

function App() {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  /**
   * Auth0ログイン状態に応じて
   * API用 Bearer Token を自動セットする
   */
  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      setAccessToken(null);
      return;
    }

    getAccessTokenSilently()
      .then((token) => {
        setAccessToken(token);
      })
      .catch(() => {
        setAccessToken(null);
      });
  }, [isAuthenticated, isLoading, getAccessTokenSilently]);

  if (isLoading) {
    return null;
  }

  return (
    <Routes>
      {/* ===== 外部公開（未ログイン可） ===== */}
      <Route
        path="/contacts"
        element={
          <Layout>
            <Contacts />
          </Layout>
        }
      />

      {/* ===== 社内（ログイン必須） ===== */}
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
            path="/contacts/internal/:id"
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
            path="/inventory/:id"
            element={
              <Layout>
                <InventoryDetail />
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

      {/* ===== フォールバック ===== */}
      <Route path="*" element={<Navigate to="/contacts" replace />} />
    </Routes>
  );
}

export default App;
