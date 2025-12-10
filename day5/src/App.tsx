import "./App.css";
import { Practice1 } from "./practices/Practice1";
import { Practice2 } from "./practices/Practice2";
import { Practice3 } from "./practices/Practice3";
import { Practice4 } from "./practices/Practice4";
import { TodoData } from "./TodoData";
import { Text } from "./Text";
import { UserProfile } from "./UserProfile";
import { UserData } from "./UserData";

const user = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  address: "123 Main St, Anytown, USA",
  hobbies: [],
};

function App() {
  return (
    <>
      <div className="App">
        <Practice1 />
        <Practice2 />
        <Practice3 />
        <Practice4 />
        <TodoData />
        <Text color="red" fontSize="18px" />
        <UserProfile user={user} />
        <UserData />
      </div>
    </>
  );
}

export default App;
