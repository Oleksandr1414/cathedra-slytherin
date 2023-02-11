export default function getCourse(date) {
  if (!date) {
    return null;
  }
  const currentYear = new Date().getFullYear();
  const studentYear = date
    ? new Date(date).getFullYear()
    : new Date().getFullYear();
  const course = (currentYear - studentYear) % 10;
  return course > 7 || course < 1 ? 7 : course;
}
