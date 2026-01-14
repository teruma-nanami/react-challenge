import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function ProtectedRoute({ children }: Props) {
  const { isAuthenticated, isLoading } = useAuth0();

  // 認証状態の判定中は何も表示しない（ローディング）
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 未ログインならトップに戻す（または /login 相当）
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // ログイン済みなら中身を表示
  return <>{children}</>;
}

export default ProtectedRoute;