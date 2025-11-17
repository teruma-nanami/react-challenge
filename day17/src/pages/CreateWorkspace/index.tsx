import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useCurrentUserStore } from "../../modules/auth/current-user.state";
import { Workspace } from "../../modules/workspaces/workspace.entity";
import { workspaceRepository } from "../../modules/workspaces/workspace.repository";
import CreateWorkspaceModal from "../Home/WorkspaceSelector/CreateWorkspaceModal";
import "../Signup/auth.css";

function CreateWorkspace() {
  const { currentUser } = useCurrentUserStore();
  const navigate = useNavigate();
  const [homeworkspaces, setHomeWorkspaces] = useState<Workspace>();
  const [isloading, setIsLoading] = useState(false);

  const fetchWorkspaces = async () => {
    setIsLoading(true);
    try {
      const workspaces = await workspaceRepository.find();
      setHomeWorkspaces(workspaces[0]);
    } catch (error) {
      console.error("Failed to fetch workspaces:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const CreateWorkspace = async (name: string) => {
    try {
      const newWorkspace = await workspaceRepository.create(name);
      navigate(`${newWorkspace.id}/${newWorkspace.channels[0].id}`);
      console.log("Workspace created:", newWorkspace);
    } catch (error) {
      console.error("Failed to create workspace:", error);
    }
  };

  if (currentUser == null) {
    return <Navigate to="/signin" />;
  }

  if (isloading) {
    return <div></div>;
  }

  if (homeworkspaces != null) {
    return (
      <Navigate to={`/${homeworkspaces.id}/${homeworkspaces.channels[0].id}`} />
    );
  }
  return (
    <div>
      <CreateWorkspaceModal onsubmit={CreateWorkspace} />
    </div>
  );
}

export default CreateWorkspace;
