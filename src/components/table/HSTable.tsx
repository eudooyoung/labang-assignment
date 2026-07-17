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
          <th scope="col">조회수</th>
          <th scope="col">판매량</th>
          <th scope="col">매출액</th>
          <th scope="col">상품수</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
};
