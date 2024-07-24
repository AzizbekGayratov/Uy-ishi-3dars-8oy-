import React, { useState } from "react";
import addSvg from "../../assets/add.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodayTodo,
  deleteTodayTodo,
  checkTodayTodo,
} from "../../store/todoSlice";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Today = ({ setSearch, count, searching }) => {
  const [searchResult, setSearchResult] = useState([]);
  const { today } = useSelector((state) => state.todos);
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  React.useEffect(() => {
    setSearch(false);
  }, []);

  React.useEffect(() => {
    const filteredResults = today.filter((task) =>
      task.text.toLowerCase().includes(searching.toLowerCase())
    );

    setSearchResult(filteredResults.reverse());
  }, [searching, today]);

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
      text: task,
      completed: false,
    };
    console.log(newTask);
    setTask("");

    dispatch(addTodayTodo(newTask));
  };
  return (
    <main className="w-full">
      <div className="flex items-center gap-[24px] mb-[40px]">
        <h1 className="font-oswald text-[36px] font-semibold leading-[53px]">
          Today
        </h1>
        <span className="idf py-[5px] px-[20px]">{count}</span>
      </div>
      <div className="w-full rounded-[40px] border-[2px] h-[79vh] py-[30px] px-[48px]">
        <div className="relative">
          <img
            src={addSvg}
            alt="svg"
            className="absolute top-[14px] left-[16px] cursor-pointer"
            onClick={handleAddTask}
          />
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            type="text"
            className="w-full py-[10px] px-[46px] border-[2px] border-loginBgColor rounded-[12px]"
            placeholder="Add new task"
          />
        </div>
        <ul className="flex flex-col overflow-auto h-[calc(95vh-200px)] overflow-y-auto">
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
    </main>
  );
};

export default Today;
