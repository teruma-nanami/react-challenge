import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useCurrentUserStore } from "../../modules/auth/current-user.state";
import { Workspace } from "../../modules/workspaces/workspace.entity";
import { workspaceRepository } from "../../modules/workspaces/workspace.repository";
import "./Home.css";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";
import WorkspaceSelector from "./WorkspaceSelector";

function Home() {
  const { currentUser } = useCurrentUserStore();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const { workspaceId } = useParams();
  const selectedWorkspace = workspaces.find(
    (workspace) => workspace.id === workspaceId
  );

  const fetchWorkspaces = async () => {
    try {
      const workspaces = await workspaceRepository.find();
      setWorkspaces(workspaces);
    } catch (error) {
      console.error("Failed to fetch workspaces:", error);
    }
  };
  useEffect(() => {
    fetchWorkspaces();
  }, []);

  if (currentUser == null) {
    return <Navigate to="/signin" />;
  }
  return (
    <div className="slack-container">
      <WorkspaceSelector
        workspaces={workspaces}
        selectWorkspaceId={workspaceId}
      />
      {selectedWorkspace != null ? (
        <>
          <Sidebar selectedWorkspace={selectedWorkspace} />
          <MainContent />
        </>
      ) : (
        <div className="sidebar" />
      )}
    </div>
  );
}

export default Home;
