import { type MouseEventHandler } from "react";
import { Table } from "./components/table/Table.tsx";
import { useList } from "./hooks/useList.ts";
import { useLogin } from "./hooks/useLogin.ts";
import { useLogout } from "./hooks/useLogout.ts";
import { usePing } from "./hooks/usePing.ts";

function App() {
  const { user, userLoading, userError, getUser } = usePing();
  const { login, loginLoading, loginError } = useLogin();
  const { logout, logoutLoading, logoutError } = useLogout();
  const { list, listLoading, listError, getList } = useList();

  if (userLoading) {
    return <>Loading...</>;
  }

  const loginHandler: MouseEventHandler = async (e) => {
    e.preventDefault();
    const success = await login();
    if (success) {
      await getList("lb");
      await getUser();
    }
  };

  const logoutHandler: MouseEventHandler = async (e) => {
    e.preventDefault();
    const success = await logout();
    if (success) {
      await getList("lb");
      await getUser();
    }
  };

  return (
    <main>
      {userError && <p>{userError.message}</p>}
      {!user && (
        <button disabled={loginLoading} onClick={loginHandler}>
          로그인
        </button>
      )}
      {loginError && <p>{loginError.message}</p>}
      {user && (
        <button disabled={logoutLoading} onClick={logoutHandler}>
          로그아웃
        </button>
      )}
      {logoutError && <p>{logoutError.message}</p>}

      <div>
        <button>라방</button>
        <button>홈쇼핑</button>
      </div>
      <Table />
    </main>
  );
}

export default App;
