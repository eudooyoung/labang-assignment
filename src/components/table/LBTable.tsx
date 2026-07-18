import { useCategories } from "@/hooks/useCategories.ts";
import type { LiveBroadCast } from "@/types/types.ts";
import styles from "./Table.module.css";
import { lbDateParser } from "@/lib/dateParsers.ts";
import { amountParser } from "@/lib/amountParser.ts";

export const LBTable = ({ list }: { list: LiveBroadCast[] }) => {
  const { categories, categoriesError } = useCategories();

  if (categoriesError) {
    console.error(categoriesError);
  }

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
            조회수
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
        {list.slice(0, 10).map((lb, idx) => (
          <tr className={styles.tableRow} key={lb.objectID}>
            <th className={styles.rowHeader} scope="row">
              {idx + 1}
            </th>
            <td className={`${styles.cell} ${styles.title}`} title={lb.title}>
              <a
                href={`https://live.ecomm-data.com/report/labang/${lb.objectID}`}
                target="_blank"
                rel="noopener noreferrer">
                {lb.title}
              </a>
            </td>
            <td className={styles.cell}>
              {categories && (
                <a
                  href={`https://live.ecomm-data.com/report/category/${lb.cid}`}
                  target="_blank"
                  rel="noopener noreferrer">
                  {categories[lb.cid].name}
                </a>
              )}
            </td>
            <td className={`${styles.cell} ${styles.date}`}>
              <p>{lbDateParser(lb.datetime_start).date}</p>
              <p className={styles.time}>
                {lbDateParser(lb.datetime_start).time}
              </p>
            </td>
            <td className={styles.cell}>
              {!lb.visit_cnt ? "로그인" : amountParser(lb.visit_cnt)}
            </td>
            <td className={styles.cell}>
              {!lb.sales_cnt ? "로그인" : amountParser(lb.sales_cnt)}
            </td>
            <td className={styles.cell}>
              {!lb.sales_amt ? "로그인" : amountParser(lb.sales_amt)}
            </td>
            <td className={`${styles.cell} ${styles.prdCnt}`}>
              {lb.product_cnt}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
