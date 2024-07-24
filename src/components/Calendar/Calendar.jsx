import React, { useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";

const Calendar = ({ setSearch }) => {
  let currentDate = new Date(Date.now());
  let thisYear = currentDate.getFullYear();
  let thisMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
  let thisDay = String(currentDate.getDate()).padStart(2, "0");

  console.log(thisYear, thisMonth, thisDay);

  useEffect(() => {
    setSearch(true);
  }, []);
  return (
    <div className="w-full h-[93.5vh] rounded-[40px] bg-bgColor flex flex-col justify-center">
      <h1 className="text-center font-oswald text-[36px] font-semibold leading-[53px] mb-[64px]">
        {thisYear} / {thisMonth} / {thisDay}
      </h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          defaultValue={dayjs(`${thisYear}-${thisMonth}-${thisDay}`)}
        />
      </LocalizationProvider>
    </div>
  );
};

export default Calendar;
