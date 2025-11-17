import { Navigate } from "react-router-dom";
import { useCurrentUserStore } from "../../modules/auth/current-user.state";
import "./Home.css";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";
import WorkspaceSelector from "./WorkspaceSelector";

function Home() {
  const { currentUser } = useCurrentUserStore();

  if (currentUser == null) {
    return <Navigate to="/signin" />;
  }
  return (
    <div className="slack-container">
      <WorkspaceSelector />
      <>
        <Sidebar />
        <MainContent />
      </>
    </div>
  );
}

export default Home;
