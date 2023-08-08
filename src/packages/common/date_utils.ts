import { format, formatDistance, getMonth, set } from "date-fns";

export const formatDate = (date?: Date): string => {
  if (!date) return "";
  return format(date, "yyyy-MM-dd");
};

export const validateTimeStartDayOfMonth =
  +formatDistance(Date.now(), set(Date.now(), { date: 1 })).split(" ")[0] < 10
    ? set(Date.now(), { month: +getMonth(Date.now()) - 1, date: 1 }) // lấy ngày 1 tháng trước
    : set(Date.now(), { date: 1 }); // lấy ngày 1 tháng hiện tại
