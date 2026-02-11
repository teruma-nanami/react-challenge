// src/App.tsx
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Contacts from "./pages/Contacts";
import AttendancePage from "./pages/Attendance";
import TimeRequestList from "./pages/TimeRequestList";
import DateRequestList from "./pages/DateRequestList";
import ContactList from "./pages/ContactList";
import ContactDetail from "./pages/ContactDetail";
import Tasks from "./pages/Tasks";
import Inventory from "./pages/Inventory";
import InventoryDetail from "./pages/InventoryDetail";
import Profile from "./pages/Profile";

import DateRequest from "./pages/DateRequest";
import Document from "./pages/Document";

import Layout from "./layouts/Layout";
import { apiFetch, setAccessToken } from "./lib/api";

function App() {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    // 未ログインならトークンを外して準備完了
    if (!isAuthenticated) {
      setAccessToken(null);
      setAuthReady(true);
      return;
    }

    // ログイン済み：必ず
    // 1) AccessToken取得
    // 2) setAccessToken
    // 3) /api/auth/create をPOST（User作成）
    // の順で実行する
    (async () => {
      try {
        setAuthReady(false);

        const token = await getAccessTokenSilently();
        setAccessToken(token);

        await apiFetch("/api/auth/create", { method: "POST" });

        setAuthReady(true);
      } catch (e) {
        console.error("Auth bootstrap failed:", e);
        setAuthReady(true);
      }
    })();
  }, [isAuthenticated, isLoading, getAccessTokenSilently]);

  if (!authReady) return null;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            to={isAuthenticated ? "/attendance" : "/contacts"}
            replace
          />
        }
      />

      {/* 外部公開 */}
      <Route
        path="/contacts"
        element={
          <Layout>
            <Contacts />
          </Layout>
        }
      />

      {/* 社内（ログイン必須） */}
      {isAuthenticated && (
        <>
          {/* 勤怠管理（打刻など） */}
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
            path="/date-requests"
            element={
              <Layout>
                <DateRequest />
              </Layout>
            }
          />

          <Route
            path="/documents"
            element={
              <Layout>
                <Document />
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
            path="/requests/time"
            element={
              <Layout>
                <TimeRequestList />
              </Layout>
            }
          />
          <Route
            path="/requests/date"
            element={
              <Layout>
                <DateRequestList />
              </Layout>
            }
          />
        </>
      )}

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
