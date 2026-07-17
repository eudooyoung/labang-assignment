import type { HomeShopping } from "@/types/types.ts";

export const HSTable = ({ list }: { list: HomeShopping[] }) => {
  return (
    <table>
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">방송정보</th>
          <th scope="col">분류</th>
          <th scope="col">방송시간</th>
          <th scope="col">시청률</th>
          <th scope="col">판매량</th>
          <th scope="col">매출액</th>
          <th scope="col">상품수</th>
        </tr>
      </thead>
      <tbody>
        {list.slice(0, 10).map((hs, idx) => (
          <tr key={hs.hsshow_id}>
            <th scope="row">{idx + 1}</th>
            <td>{hs.hsshow_title}</td>
            <td>{hs.cat.cat_name}</td>
            <td>{hs.hsshow_datetime_start}</td>
            <td>{hs.visit_cnt === null ? "로그인" : ""}</td>
            <td>{!hs.sales_cnt ? "로그인" : hs.sales_cnt}</td>
            <td>{!hs.sales_amt ? "로그인" : hs.sales_amt}</td>
            <td>{hs.item_cnt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
