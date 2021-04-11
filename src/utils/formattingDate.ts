function formattingDate(date: string) {
  const dateObj = new Date(date.replace(/th|nd|st/, ''));
  const year: string = dateObj.getFullYear().toString();
  let month: string = (dateObj.getMonth() + 1).toString();
  let day: string = dateObj.getDate().toString();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [day, month, year].join('.');
}

export default formattingDate;
