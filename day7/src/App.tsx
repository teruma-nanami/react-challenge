import { Button,Box } from "@chakra-ui/react";
import { AppRouter } from "./Router/AppRouter";
import { Header } from "./components/Organism/Header";
import "./App.css";

function App() {

  return (
    <>
      <Header />
      <Box p="2rem">
        <Button colorScheme="teal">Hello Chakra</Button>
        <p>This is a simple Chakra UI button.</p>
      </Box>
      <AppRouter />
    </>
  );
}

export default App;
