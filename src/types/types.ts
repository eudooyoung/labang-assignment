export type User = {
  user_id: string;
  nickname: string;
  sess_id: string;
  user_type: number;
  voucher: number;
  prefer: number;
};

export type List = LiveBroadCast[] | HomeShopping[];

export type LiveBroadCast = {
  objectID: string;
  platform_id: string;
  datetime_start: string;
  product_cnt: number;
  visit_cnt: number | null;
  sales_cnt: number | null;
  sales_amt: number | null;
  title: string;
  cid: number;
};

export type HomeShopping = {
  hsshow_id: string;
  platform_id: string;
  platform_name: string;
  hsshow_title: string;
  hsshow_datetime_start: string;
  hsshow_datetime_end: string;
  hsshow_url_libe: string;
  item_cnt: number;
  cid: number;
  sales_cnt: number | null;
  sales_amt: number | null;
  cat: HSCategory;
  visit_cnt?: null;
};

export type HSCategory = {
  cid: number;
  cat_name: string;
};

export type ListType = "lb" | "hs";

export type Category = {
  pid: null | number;
  name: string;
};

export type Categories = {
  [key: string]: Category;
};
