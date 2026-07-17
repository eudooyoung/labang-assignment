export type User = {
  user_id: string;
  nickname: string;
  sess_id: string;
  user_type: number;
  voucher: number;
  prefer: number;
};

export type ListResponse = {
  list: LiveBroadCast[];
  user: null | User;
  mask?: boolean;
};

export type LiveBroadCast = {
  objectID: string;
  platform_id: string;
  datetime_start: string;
  product_cnt: number;
  visit_cnt: number;
  saled_cnt: number;
  sales_amt: number;
  title: string;
  cid: number;
};

export type HomeShopping = {
  hsshow_id: string;
  platform_id: string;
  platform_name: string;
  hsshow_title: string;
  hssshow_datetime_start: string;
  hssshow_datetime_end: string;
  hssshow_url_libe: string;
  item_cnt: number;
  cid: number;
  sales_cnt: number;
  salles_amt: number;
  cat: Category;
};

export type Category = {
  cid: number;
  cat_name: string;
};

export type ListType = "lb" | "hs";
