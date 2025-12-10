import WorkspaceSelector from './WorkspaceSelector';
import './Home.css';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

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
