import { format, parse } from "date-fns";
import { ko } from "date-fns/locale";

export const lbDateParser = (rawDate: string) => {
  const lbDate = parse(rawDate, "yyMMddHHmm", new Date());
  const [date, time] = format(lbDate, "yy.MM.dd (EEE), HH:mm", {
    locale: ko,
  }).split(", ");
  return { date, time };
};

export const hsDateParser = (rawDate: string) => {
  const hsDate = parse(rawDate, "yyyyMMddHHmm", new Date());
  const [date, time] = format(hsDate, "yy.MM.dd (EEE), HH:mm", {
    locale: ko,
  }).split(", ");
  return { date, time };
};
