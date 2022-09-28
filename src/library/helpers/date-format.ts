import moment from "moment";

export const formatDateReadable = (date: string) => {
  return moment(date).format('l HH:mm');
}