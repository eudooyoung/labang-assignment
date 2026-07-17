import { useCategories } from "@/hooks/useCategories.ts";
import type { LiveBroadCast } from "@/types/types.ts";

export const LBTable = ({ list }: { list: LiveBroadCast[] }) => {
  const { categories, categoriesLoading, categoriesError } = useCategories();

  return (
    <table>
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">방송정보</th>
          <th scope="col">분류</th>
          <th scope="col">방송시간</th>
          <th scope="col">조회수</th>
          <th scope="col">판매량</th>
          <th scope="col">매출액</th>
          <th scope="col">상품수</th>
        </tr>
      </thead>
      <tbody>
        {list.slice(0, 10).map((lb, idx) => (
          <tr key={lb.objectID}>
            <th scope="row">{idx + 1}</th>
            <td>{lb.title}</td>
            {!categoriesLoading && !categoriesError && (
              <td>{categories![lb.cid].name}</td>
            )}
            <td>{lb.datetime_start}</td>
            <td>{!lb.visit_cnt ? "로그인" : lb.visit_cnt}</td>
            <td>{!lb.sales_cnt ? "로그인" : lb.sales_cnt}</td>
            <td>{!lb.sales_amt ? "로그인" : lb.sales_amt}</td>
            <td>{lb.product_cnt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
