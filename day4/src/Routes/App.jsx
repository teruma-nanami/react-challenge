// import { useState } from "react";
import "./App.css";
import { DefaultLayout } from "../components/pages/DefaultLayout";
import { UserProvider } from "../providers/UserProvider";
import { AppRouter } from "./AppRouter";

function App() {
  return (
    <>
      <UserProvider>
        <DefaultLayout>
          <AppRouter />
        </DefaultLayout>
      </UserProvider>
    </>
  );
}
export default App;
