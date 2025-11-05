import { memo } from 'react';

export const Home = memo(() => {
  return (
    <div className="home-container">
      <h2 className="home-title">Welcome to the Home Page</h2>
      <p className="home-description">
        This is the home page of our application. Feel free to explore!
      </p>
    </div>
  );
}
);

export default Home;