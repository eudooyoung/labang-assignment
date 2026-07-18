import type { HomeShopping } from "@/types/types.ts";
import styles from "./Table.module.css";

export const HSTable = ({ list }: { list: HomeShopping[] }) => {
  return (
    <table className={styles.table}>
      <colgroup>
        <col className={styles.indexCol} />
        <col className={styles.titleCol} />
        <col className={styles.catCol} />
        <col className={styles.timeCol} />
        <col className={styles.visitCol} />
        <col className={styles.salesCntCol} />
        <col className={styles.salesAmtCol} />
        <col className={styles.prodCntCol} />
      </colgroup>
      <thead>
        <tr>
          <th className={styles.colHeader} scope="col"></th>
          <th className={styles.colHeader} scope="col">
            방송정보
          </th>
          <th className={styles.colHeader} scope="col">
            분류
          </th>
          <th className={styles.colHeader} scope="col">
            방송시간
          </th>
          <th className={styles.colHeader} scope="col">
            시청률
          </th>
          <th className={styles.colHeader} scope="col">
            판매량
          </th>
          <th className={styles.colHeader} scope="col">
            매출액
          </th>
          <th className={styles.colHeader} scope="col">
            상품수
          </th>
        </tr>
      </thead>
      <tbody>
        {list.slice(0, 10).map((hs, idx) => (
          <tr className={styles.tableRow} key={hs.hsshow_id}>
            <th className={styles.rowHeader} scope="row">
              {idx + 1}
            </th>
            <td className={`${styles.cell} ${styles.title}`}>
              {hs.hsshow_title}
            </td>
            <td className={styles.cell}>{hs.cat.cat_name}</td>
            <td className={styles.cell}>{hs.hsshow_datetime_start}</td>
            <td className={styles.cell}>
              {hs.visit_cnt === null ? "로그인" : ""}
            </td>
            <td className={styles.cell}>
              {!hs.sales_cnt ? "로그인" : hs.sales_cnt}
            </td>
            <td className={styles.cell}>
              {!hs.sales_amt ? "로그인" : hs.sales_amt}
            </td>
            <td className={`${styles.cell} ${styles.itmCnt}`}>{hs.item_cnt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
