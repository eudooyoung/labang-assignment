import { useState, type MouseEventHandler } from "react";
import { LBTable } from "./components/table/LBTable.tsx";
import { useList } from "./hooks/useList.ts";
import { useLogin } from "./hooks/useLogin.ts";
import { useLogout } from "./hooks/useLogout.ts";
import { usePing } from "./hooks/usePing.ts";
import type { ListType } from "./types/types.ts";
import { HSTable } from "./components/table/HSTable.tsx";

function App() {
  const { user, userLoading, userError, getUser } = usePing();
  const { login, loginLoading, loginError } = useLogin();
  const { logout, logoutLoading, logoutError } = useLogout();
  const { list, listLoading, listError, getList } = useList();
  const [listType, setListType] = useState<ListType>("lb");

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

  const toggleList = (type: ListType) => async () => {
    setListType(type);
    await getList(type);
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
        <button onClick={toggleList("lb")}>라방</button>
        <button onClick={toggleList("hs")}>홈쇼핑</button>
      </div>
      {listType === "lb" && <LBTable list={list} />}
      {listType === "hs" && <HSTable list={list} />}
    </main>
  );
}

export default App;
