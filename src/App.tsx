import { useState, type MouseEventHandler } from "react";
import { LBTable } from "./components/table/LBTable.tsx";
import { useList } from "./hooks/useList.ts";
import { useLogin } from "./hooks/useLogin.ts";
import { useLogout } from "./hooks/useLogout.ts";
import { usePing } from "./hooks/usePing.ts";
import type { HomeShopping, ListType, LiveBroadCast } from "./types/types.ts";
import { HSTable } from "./components/table/HSTable.tsx";
import styles from "./App.module.css";

function App() {
  const { user, userLoading, userError, getUser } = usePing();
  const { login, loginLoading, loginError } = useLogin();
  const { logout, logoutLoading, logoutError } = useLogout();
  const { list, listLoading, listError, getList } = useList();
  const [listType, setListType] = useState<ListType>("lb");

  if (userLoading || loginLoading || logoutLoading) {
    return <>Loading...</>;
  }

  const loginHandler: MouseEventHandler = async (e) => {
    e.preventDefault();
    const success = await login();
    if (success) {
      await getUser();
      await getList(listType);
    }
  };

  const logoutHandler: MouseEventHandler = async (e) => {
    e.preventDefault();
    const success = await logout();
    if (success) {
      await getUser();
      await getList(listType);
    }
  };

  const toggleList = (type: ListType) => async () => {
    setListType(type);
    await getList(type);
  };

  return (
    <main className={styles.main}>
      {/* 로그인 & 로그아웃 버튼 */}
      <div className={styles.loginButtonWrapper}>
        {userError && <p>{userError.message}</p>}
        {!user && (
          <button
            className={styles.loginButton}
            disabled={loginLoading}
            onClick={loginHandler}>
            로그인
          </button>
        )}
        {loginError && <p>{loginError.message}</p>}
        {user && (
          <button
            className={styles.logoutButton}
            disabled={logoutLoading}
            onClick={logoutHandler}>
            로그아웃
          </button>
        )}
        {logoutError && <p>{logoutError.message}</p>}
      </div>

      {/* 타입 토글 */}
      <div className={styles.toggles}>
        <button
          className={`${styles.toggleButton} ${listType !== "lb" ? styles.inActive : ""}`}
          onClick={toggleList("lb")}>
          라방
        </button>
        <button
          className={`${styles.toggleButton} ${listType !== "hs" ? styles.inActive : ""}`}
          onClick={toggleList("hs")}>
          홈쇼핑
        </button>
      </div>

      {/* 테이블 */}
      <div className={styles.tableWrapper}>
        {!listLoading && !listError && (
          <>
            {listType === "lb" && <LBTable list={list as LiveBroadCast[]} />}
            {listType === "hs" && <HSTable list={list as HomeShopping[]} />}
          </>
        )}
        {listLoading && <p>Loading...</p>}
        {listError && <p>{listError.message}</p>}
      </div>
    </main>
  );
}

export default App;
