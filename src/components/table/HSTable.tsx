import type { HomeShopping } from "@/types/types.ts";
import styles from "./Table.module.css";
import { hsDateParser } from "@/lib/dateParsers.ts";
import { amountParser } from "@/lib/amountParser.ts";

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
            <td
              className={`${styles.cell} ${styles.title}`}
              title={hs.hsshow_title}>
              <a
                href={`https://live.ecomm-data.com/report/hsshow/${hs.hsshow_id}`}
                target="_blank"
                rel="noopener noreferrer">
                {hs.hsshow_title}
              </a>
            </td>
            <td className={styles.cell}>
              <a
                href={`https://live.ecomm-data.com/report/category/hs/${hs.cat.cid}`}
                target="_blank"
                rel="noopener noreferrer">
                {hs.cat.cat_name}
              </a>
            </td>
            <td className={`${styles.cell} ${styles.date}`}>
              <p>{hsDateParser(hs.hsshow_datetime_start).date}</p>
              <p className={styles.time}>
                {hsDateParser(hs.hsshow_datetime_start).time}
              </p>
            </td>
            <td className={styles.cell}>
              {hs.visit_cnt === null ? "로그인" : "준비중"}
            </td>
            <td className={styles.cell}>
              {!hs.sales_cnt ? "로그인" : amountParser(hs.sales_cnt)}
            </td>
            <td className={styles.cell}>
              {!hs.sales_amt ? "로그인" : amountParser(hs.sales_amt)}
            </td>
            <td className={`${styles.cell} ${styles.itmCnt}`}>{hs.item_cnt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
