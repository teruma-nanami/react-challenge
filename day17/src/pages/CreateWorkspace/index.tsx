import { Navigate } from "react-router-dom";
import { useCurrentUserStore } from "../../modules/auth/current-user.state";
import CreateWorkspaceModal from "../Home/WorkspaceSelector/CreateWorkspaceModal";
import "../Signup/auth.css";

function CreateWorkspace() {
  const { currentUser } = useCurrentUserStore();

  if (currentUser == null) {
    return <Navigate to="/signin" />;
  }
  return (
    <div>
      <CreateWorkspaceModal />
    </div>
  );
}

export default CreateWorkspace;
