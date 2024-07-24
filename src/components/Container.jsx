import { Route, Routes, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Home/Home";
import Today from "./Today/Today";
import Calendar from "./Calendar/Calendar";
import ProtectedRoute from "../components/protected-route/ProtectedRoute";
import { IoSearch } from "react-icons/io5";
import { FcSettings } from "react-icons/fc";
import List from "../assets/list.svg";
import CalendarSvg from "../assets/calendar.svg";
import SignOutBtn from "./SignOutBtn/SignOutBtn";
import SignUpBtn from "./SignUpBtn/SignUpBtn";
import { GiHamburgerMenu } from "react-icons/gi";
import Upcoming from "./Upcoming/Upcoming";
import upcomingSvg from "../assets/upcoming.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  setTodayTodos,
  setTomorrowTodos,
  setThisWeekTodos,
} from "../store/todoSlice";

const Container = () => {
  const { today, tomorrow, thisWeek } = useSelector((state) => state.todos);
  const [search, setSearch] = useState(true);
  const [searchingItem, setSearchingItem] = useState("");
  const [toggleSignBtn, setToggleSignBtn] = useState(false);
  const dispatch = useDispatch();

  const allTodos = [...today, ...tomorrow, ...thisWeek];
  const count = allTodos.length;

  useEffect(() => {
    const todayData = localStorage.getItem("todayTodos");
    const tomorrowData = localStorage.getItem("tomorrowTodos");
    const thisWeekData = localStorage.getItem("thisWeekTodos");

    dispatch(setTodayTodos(JSON.parse(todayData)));
    dispatch(setTomorrowTodos(JSON.parse(tomorrowData)));
    dispatch(setThisWeekTodos(JSON.parse(thisWeekData)));
  }, []);

  return (
    <div className="max-w-[1320px] mx-auto px-[10px]">
      <div className="grid grid-cols-[350px_1fr] gap-[30px] p-[20px]">
        <aside className="bg-bgColor h-[93.5vh] rounded-[40px] py-[25px] px-[35px]">
          <div className="h-full flex flex-col justify-between">
            <div className="">
              <h2 className="flex items-center justify-between font-oswald text-[32px] font-semibold leading-[47px] mb-[40px]">
                Menu
                <GiHamburgerMenu className="cursor-pointer" />
              </h2>
              <div className="relative mb-[70px]">
                <IoSearch
                  size={15}
                  className="absolute top-[11px] left-[10px]"
                />
                <input
                  onChange={(e) => setSearchingItem(e.target.value)}
                  value={searchingItem}
                  disabled={search}
                  type="text"
                  className="rounded-[50px] bg-[#fff9f9] w-[264px] py-[6px] pl-[34px]"
                  placeholder={search ? "Search" : "Search from your tasks"}
                />
              </div>
              <div className="px-[10px]">
                <h3 className="font-oswald text-[15px] font-semibold leading-[22px] mb-[16px]">
                  Tasks
                </h3>
                <ul className="flex flex-col gap-[10px]">
                  <li className="font-notoSans text-[15px] leading-[22px] relative">
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "flex bg-loginBgColor items-center gap-[6px] font-notoSans text-[13px] leading-[156%] px-[15px] py-[3px] rounded-[40px]"
                          : "flex items-center gap-[6px] px-[15px] py-[3px] font-notoSans text-[13px] leading-[156%]"
                      }
                      to="/upcoming"
                    >
                      <img src={upcomingSvg} alt="svg" />
                      Upcoming
                    </NavLink>
                    <span className="absolute font-bold top-0 right-3 px-[3px] py-[2px] text-[15px]">
                      {count}
                    </span>
                  </li>
                  <li className="font-notoSans text-[15px] leading-[22px] relative">
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "flex bg-loginBgColor items-center gap-[6px] font-notoSans text-[13px] leading-[156%] px-[15px] py-[3px] rounded-[40px]"
                          : "flex items-center gap-[6px] px-[15px] py-[3px] font-notoSans text-[13px] leading-[156%]"
                      }
                      to="/today"
                    >
                      <img src={List} alt="svg" />
                      Today
                    </NavLink>
                    <span className="absolute font-bold top-0 right-3 px-[3px] py-[2px] text-[15px]">
                      {today.length}
                    </span>
                  </li>
                  <li className="font-notoSans text-[15px] leading-[22px]">
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "flex bg-loginBgColor items-center gap-[6px] font-notoSans text-[13px] leading-[156%] px-[15px] py-[3px] rounded-[40px]"
                          : "flex items-center gap-[6px] px-[15px] py-[3px] font-notoSans text-[13px] leading-[156%]"
                      }
                      to="/calendar"
                    >
                      <img src={CalendarSvg} alt="svg" />
                      Calendar
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col gap-[16px]">
              <button className="flex items-center gap-[10px]">
                <FcSettings size={20} />
                <span className="font-notoSans text-[20px] leading-[27px]">
                  Settings
                </span>
              </button>
              {toggleSignBtn ? (
                <SignUpBtn
                  toggleValue={toggleSignBtn}
                  setToggleValue={setToggleSignBtn}
                />
              ) : (
                <SignOutBtn
                  toggleValue={toggleSignBtn}
                  setToggleValue={setToggleSignBtn}
                />
              )}
            </div>
          </div>
        </aside>
        <Routes>
          <Route path="/" element={<Home setSearch={setSearch} />} />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/upcoming"
              element={
                <Upcoming setSearch={setSearch} searching={searchingItem} />
              }
            />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route
              path="/today"
              element={
                <Today
                  setSearch={setSearch}
                  count={today.length}
                  searching={searchingItem}
                />
              }
            />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route
              path="/calendar"
              element={<Calendar setSearch={setSearch} />}
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default Container;
