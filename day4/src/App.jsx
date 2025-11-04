// import { useState } from "react";
import "./App.css";
import { PrimaryButton } from "./components/atoms/PrimaryButton";
import { SecondaryButton } from "./components/atoms/SecondaryButton";
import { DefaultLayout } from "./components/pages/DefaultLayout";
import { UserProvider } from "./providers/UserProvider";

function App(props) {
  const children = props.children;
  return (
    <>
      <UserProvider>
        <DefaultLayout>
          {children}
          {/* <PrimaryButton>first</PrimaryButton>
          <SecondaryButton>Second</SecondaryButton> */}
        </DefaultLayout>
      </UserProvider>
    </>
  );
}
export default App;
