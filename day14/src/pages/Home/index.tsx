import "./Home.css";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";
import WorkspaceSelector from "./WorkspaceSelector";

function Home() {
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
