import { ReactNode, useEffect, useState } from "react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import Header from './components/Header';
import StatusWindow from "./components/StatusWindow";

const client = generateClient<Schema>();

export interface MainTab {
  value: String,
  label: String,
  component: ReactNode,
}

function App() {
  const { user, signOut } = useAuthenticator();
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [statusTab, setStatusTab] = useState<MainTab | null>(null);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }
  
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  return (
    <div className="window" style={{
      width: "100vw",
      height: "100vh"
    }}>
      <Header />
      <div className="window-body">
        <StatusWindow selectedTab={statusTab} setSelectedTab={setStatusTab}/>

      <main>
        <h1>{user?.signInDetails?.loginId}'s todos</h1>
        <button onClick={createTodo}>+ new</button>
        <ul>
          {todos.map((todo) => (
            <li
              onClick={() => deleteTodo(todo.id)}
              key={todo.id}
            >{todo.content}</li>
          ))}
        </ul>
        <div>
          🥳 App successfully hosted. Try creating a new todo.
          <br />
          <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
            Review next step of this tutorial.
          </a>
        </div>
        <button onClick={signOut}>Sign out</button>
      </main>
      </div>
    </div>
  );
}

export default App;
