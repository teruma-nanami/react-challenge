import { useEffect, useState } from "react";
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
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      setAccessToken(null);
      setAuthReady(true);
      return;
    }

    getAccessTokenSilently()
      .then((token) => {
        setAccessToken(token);
        setAuthReady(true);
      })
      .catch(() => {
        setAccessToken(null);
        setAuthReady(true);
      });
  }, [isAuthenticated, isLoading, getAccessTokenSilently]);

  if (!authReady) {
    return null;
  }

  return (
    <Routes>
      {/* ✅ ここが追加：/ に来たら状態に応じて振り分け */}
      <Route
        path="/"
        element={
          <Navigate
            to={isAuthenticated ? "/attendance" : "/contacts"}
            replace
          />
        }
      />

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

      {/* ✅ フォールバックは常に用意（真っ白防止） */}
      <Route
        path="*"
        element={
          <Navigate
            to={isAuthenticated ? "/attendance" : "/contacts"}
            replace
          />
        }
      />
    </Routes>
  );
}

export default App;
