import moment from "moment";

export function formatDate(date: string) {
  let currentDate = new Date(parseInt(date));
  return moment(currentDate).fromNow();
}
