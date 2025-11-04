// import { useState } from "react";
import "./App.css";
import { PrimaryButton } from "./components/atoms/PrimaryButton";
import { SecondaryButton } from "./components/atoms/SecondaryButton";
import { SearchInput } from "./components/atoms/SearchInput";
import { UserCard } from "./components/organism/UserCard";
import { Link } from "react-router-dom";

const user = {
  image:
    "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2832",
  name: "User Name",
  email: "user@example.com",
  location: "Tokyo, Japan",
  tel: "090-1234-5678",
  website: "https://example.com",
};

function App() {
  return (
    <>
      <header>
        {/* <Link to="/">Home</Link>
        <Link to="/about">About</Link> */}
      </header>
      <PrimaryButton>first</PrimaryButton>
      <SecondaryButton>Second</SecondaryButton>
      <SearchInput />
      <UserCard user={user} />
    </>
  );
}
export default App;
