const DAY = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday",
};

const getDay = (day: number) => DAY[day as keyof typeof DAY];
export default getDay;
