export default function getDateFormat(date) {
  const d = new Date(date);
  const day = d.getDate() > 9 ? d.getDate() : `0${d.getDate()}`;
  const month = d.getMonth() > 9 ? d.getMonth() : `0${d.getMonth()}`;
  return day + "." + month + "." + d.getFullYear();
}
