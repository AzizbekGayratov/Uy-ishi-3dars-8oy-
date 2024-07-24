import React, { useState } from "react";
import addSvg from "../../assets/add.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodayTodo,
  deleteTodayTodo,
  checkTodayTodo,
} from "../../store/todoSlice";
import {
  addTomorrowTodo,
  deleteTomorrowTodo,
  checkTomorrowTodo,
} from "../../store/todoSlice";
import {
  addThisWeekTodo,
  deleteThisWeekTodo,
  checkThisWeekTodo,
} from "../../store/todoSlice";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Upcoming = ({ setSearch, searching }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [tommorrowResults, setTomorrowResults] = useState([]);
  const [thisWeekResults, setThisWeekResults] = useState([]);
  const { today, tomorrow, thisWeek } = useSelector((state) => state.todos);
  const [todayTask, setTodayTask] = useState("");
  const [tomorrowTask, setTomorrowTask] = useState("");
  const [thisWeekTask, setThisWeekTask] = useState("");
  const dispatch = useDispatch();

  //   const allTodos = [...today, ...tomorrow, ...thisWeek];
  //   const count = allTodos.length;

  React.useEffect(() => {
    setSearch(false);
  }, []);

  React.useEffect(() => {
    const filteredResults = today.filter((task) =>
      task.text.toLowerCase().includes(searching.toLowerCase())
    );
    const filteredResults2 = tomorrow.filter((task) =>
      task.text.toLowerCase().includes(searching.toLowerCase())
    );
    const filteredResults3 = thisWeek.filter((task) =>
      task.text.toLowerCase().includes(searching.toLowerCase())
    );

    setSearchResult(filteredResults.reverse());
    setTomorrowResults(filteredResults2.reverse());
    setThisWeekResults(filteredResults3.reverse());
  }, [searching, today, tomorrow, thisWeek]);

  // today
  const handleCheck = (id) => {
    dispatch(checkTodayTodo(id));
    toast.success("Task deleted successfully");
  };
  const handleDelete = (id) => {
    dispatch(deleteTodayTodo(id));
    toast.success("Task deleted successfully");
  };
  const handleAddTask = () => {
    const newTask = {
      id: Date.now(),
      text: todayTask,
      completed: false,
    };
    console.log(newTask);
    setTodayTask("");

    dispatch(addTodayTodo(newTask));
  };

  // tomorrow
  const handleCheck2 = (id) => {
    dispatch(checkTomorrowTodo(id));
    toast.success("Task deleted successfully");
  };
  const handleDelete2 = (id) => {
    dispatch(deleteTomorrowTodo(id));
    toast.success("Task deleted successfully");
  };
  const handleAddTask2 = () => {
    const newTask = {
      id: Date.now(),
      text: tomorrowTask,
      completed: false,
    };
    console.log(newTask);
    setTomorrowTask("");

    dispatch(addTomorrowTodo(newTask));
  };

  // tomorrow
  const handleCheck3 = (id) => {
    dispatch(checkThisWeekTodo(id));
    toast.success("Task deleted successfully");
  };
  const handleDelete3 = (id) => {
    dispatch(deleteThisWeekTodo(id));
    toast.success("Task deleted successfully");
  };
  const handleAddTask3 = () => {
    const newTask = {
      id: Date.now(),
      text: thisWeekTask,
      completed: false,
    };
    console.log(newTask);
    setThisWeekTask("");

    dispatch(addThisWeekTodo(newTask));
  };

  return (
    <main className="w-full">
      <div className="flex items-center gap-[24px] mb-[10px]">
        <h1 className="font-oswald text-[36px] font-semibold leading-[53px]">
          Today
        </h1>
        <span className="idf py-[5px] px-[20px]">{today.length}</span>
      </div>
      <div className="flex flex-col gap-[24px]">
        <div className="w-full rounded-[40px] border-[2px] h-[40vh] py-[20px] px-[34px]">
          <div className="relative">
            <img
              src={addSvg}
              alt="svg"
              className="absolute top-[14px] left-[16px] cursor-pointer"
              onClick={handleAddTask}
            />
            <input
              value={todayTask}
              onChange={(e) => setTodayTask(e.target.value)}
              type="text"
              className="w-full py-[10px] px-[46px] border-[2px] border-loginBgColor rounded-[12px]"
              placeholder="Add new task"
            />
          </div>
          <ul className="flex flex-col overflow-auto h-[calc(55vh-200px)] overflow-y-auto">
            {searchResult.map((todo) => (
              <li
                key={todo.id}
                className="py-[15px] px-[25px] border-b-[2px] border-loginBgColor flex items-center justify-between"
              >
                <div className="flex items-center gap-[10px]">
                  <input
                    onChange={() => {
                      Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, update it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          handleCheck(todo.id);
                        }
                      });
                    }}
                    type="checkbox"
                    className="checkbox"
                    checked={todo.completed}
                  />
                  <p className="font-notoSans text-[18px] leading-[20px]">
                    {todo.text}
                  </p>
                </div>
                <MdDeleteOutline
                  className="cursor-pointer"
                  onClick={() => {
                    Swal.fire({
                      title: "Are you sure?",
                      text: "You won't be able to revert this!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, delete it!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleDelete(todo.id);
                      }
                    });
                  }}
                  size={20}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-[30px]">
          <div className="">
            <div className="flex items-start gap-[24px] mb-[6px]">
              <h3 className="font-oswald text-[26px] font-semibold leading-[32px]">
                Tomorrow
              </h3>
              <span className="idf py-[3px] px-[14px]">{tomorrow.length}</span>
            </div>
            <div className=" rounded-[40px] border-[2px] h-[34vh] py-[18px] px-[22px]">
              <div className="relative">
                <img
                  src={addSvg}
                  alt="svg"
                  className="absolute top-[14px] left-[16px] cursor-pointer"
                  onClick={handleAddTask2}
                />
                <input
                  value={tomorrowTask}
                  onChange={(e) => setTomorrowTask(e.target.value)}
                  type="text"
                  className="w-full py-[10px] px-[46px] border-[2px] border-loginBgColor rounded-[12px]"
                  placeholder="Add new task"
                />
              </div>
              <ul className="flex flex-col overflow-auto h-[calc(22vh-10px)] overflow-y-auto">
                {tommorrowResults.map((todo) => (
                  <li
                    key={todo.id}
                    className="py-[15px] px-[25px] border-b-[2px] border-loginBgColor flex items-center justify-between"
                  >
                    <div className="flex items-center gap-[10px]">
                      <input
                        onChange={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, update it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              handleCheck2(todo.id);
                            }
                          });
                        }}
                        type="checkbox"
                        className="checkbox"
                        checked={todo.completed}
                      />
                      <p className="font-notoSans text-[18px] leading-[20px]">
                        {todo.text}
                      </p>
                    </div>
                    <MdDeleteOutline
                      className="cursor-pointer"
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            handleDelete2(todo.id);
                          }
                        });
                      }}
                      size={20}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="">
            <div className="flex items-start gap-[24px] mb-[6px]">
              <h3 className="font-oswald text-[26px] font-semibold leading-[32px]">
                This Week
              </h3>
              <span className="idf py-[3px] px-[14px]">{thisWeek.length}</span>
            </div>
            <div className=" rounded-[40px] border-[2px] h-[34vh] py-[18px] px-[22px]">
              <div className="relative">
                <img
                  src={addSvg}
                  alt="svg"
                  className="absolute top-[14px] left-[16px] cursor-pointer"
                  onClick={handleAddTask3}
                />
                <input
                  value={thisWeekTask}
                  onChange={(e) => setThisWeekTask(e.target.value)}
                  type="text"
                  className="w-full py-[10px] px-[46px] border-[2px] border-loginBgColor rounded-[12px]"
                  placeholder="Add new task"
                />
              </div>
              <ul className="flex flex-col overflow-auto h-[calc(22vh-10px)] overflow-y-auto">
                {thisWeekResults.map((todo) => (
                  <li
                    key={todo.id}
                    className="py-[15px] px-[25px] border-b-[2px] border-loginBgColor flex items-center justify-between"
                  >
                    <div className="flex items-center gap-[10px]">
                      <input
                        onChange={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, update it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              handleCheck3(todo.id);
                            }
                          });
                        }}
                        type="checkbox"
                        className="checkbox"
                        checked={todo.completed}
                      />
                      <p className="font-notoSans text-[18px] leading-[20px]">
                        {todo.text}
                      </p>
                    </div>
                    <MdDeleteOutline
                      className="cursor-pointer"
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            handleDelete3(todo.id);
                          }
                        });
                      }}
                      size={20}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Upcoming;
