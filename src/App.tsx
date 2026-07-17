import { useState, type MouseEventHandler } from "react";
import { Table } from "./components/table/Table.tsx";
import { useList } from "./hooks/useList.ts";
import { useLogin } from "./hooks/useLogin.ts";
import { useLogout } from "./hooks/useLogout.ts";

function App() {
  const { login, loginLoading, loginError } = useLogin();
  const { logout, logoutLoading, logoutError } = useLogout();
  const { list, listLoading, listError, getList } = useList();

  if (loginLoading) {
    <>Loading...</>;
  }

  const loginHandler: MouseEventHandler = async (e) => {
    e.preventDefault();
    const success = await login();
    if (success) {
      await getList("lb");
    }
  };

  const logoutHandler: MouseEventHandler = async (e) => {
    e.preventDefault();
    const success = await logout();
    if (success) {
      await getList("lb");
    }
  };

  return (
    <main>
      <button onClick={loginHandler}>로그인</button>
      {loginError && <p>{loginError.message}</p>}
      <button onClick={logoutHandler}>로그아웃</button>
      <div>
        <button>라방</button>
        <button>홈쇼핑</button>
      </div>
      <Table />
    </main>
  );
}

export default App;
