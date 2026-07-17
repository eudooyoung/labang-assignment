import { Table } from "./components/table/Table.tsx";
import { useLogin } from "./hooks/useLogin.ts";

function App() {
  const { loginLoading, loginError } = useLogin();

  if (loginLoading) {
    <>Loading...</>;
  }

  return (
    <main>
      {loginError && <p>{loginError.message}</p>}
      <div>
        <button>라방</button>
        <button>홈쇼핑</button>
      </div>
      <Table />
    </main>
  );
}

export default App;
