const useDate = () => {
  const today = new Date();
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  const days = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];

  const day = today.toLocaleDateString();
  const monthName = months[today.getMonth()];
  const dayName = days[today.getDay()];
  const dateNum = today.getDate();

  const date = { day, monthName, dayName, dateNum };

  return date;
};

export default useDate;
