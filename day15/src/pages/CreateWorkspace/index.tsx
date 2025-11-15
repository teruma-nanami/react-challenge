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
  const [homeWorkspace, setHomeWorkspace] = useState<Workspace>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWorkspace();
  }, []);

  const fetchWorkspace = async () => {
    try {
      const workspace = await workspaceRepository.find();
      setHomeWorkspace(workspace[0]);
    } catch (error) {
      console.error("Failed to fetch workspace:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const CreateWorkspace = async () => {
    try {
      const newWorkspace = await workspaceRepository.create(name);
      navigate(`/${newWorkspace.id}/${newWorkspace.channels[0].id}`);
    } catch (error) {
      console.error("Failed to create workspace:", error);
    }
  };

  if (isLoading) {
    return <div></div>;
  }

  if (currentUser == null) {
    return <Navigate to="/signin" />;
  }

  if (homeWorkspace != null) {
    return (
      <Navigate to={`/${homeWorkspace.id}/${homeWorkspace.channels[0].id}`} />
    );
  }

  return (
    <div>
      <CreateWorkspaceModal onSubmit={CreateWorkspace} />
    </div>
  );
}

export default CreateWorkspace;
