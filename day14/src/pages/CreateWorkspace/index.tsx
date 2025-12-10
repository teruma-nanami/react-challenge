import { Navigate } from "react-router-dom";
import { useCurrentUserStore } from "../../modules/auth/current-user.state";
import CreateWorkspaceModal from "../Home/WorkspaceSelector/CreateWorkspaceModal";
import "../Signup/auth.css";

function CreateWorkspace() {
  const { currentUser } = useCurrentUserStore();

  if (currentUser == null) {
    return <Navigate to="/signin" />;
  }

  // ワークスペース作成時の処理（仮）
  const handleSubmit = (name: string) => {
    console.log("作成されたワークスペース名:", name);
  };

  return (
    <div>
      <CreateWorkspaceModal onSubmit={handleSubmit} />
    </div>
  );
}

export default CreateWorkspace;
