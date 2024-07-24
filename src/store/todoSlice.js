import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    today: [],
    tomorrow: [],
    thisWeek: [],
  },
  reducers: {
    // today
    setTodayTodos: (state, action) => {
      state.today = action.payload;
      localStorage.setItem("todayTodos", JSON.stringify(state.today));
    },
    addTodayTodo: (state, action) => {
      state.today.push(action.payload);
      localStorage.setItem("todayTodos", JSON.stringify(state.today));
    },
    deleteTodayTodo: (state, action) => {
      state.today = state.today.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todayTodos", JSON.stringify(state.today));
    },
    checkTodayTodo: (state, action) => {
      state.today = state.today.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
      localStorage.setItem("todayTodos", JSON.stringify(state.today));
    },
    // tomorrow
    setTomorrowTodos: (state, action) => {
      state.tomorrow = action.payload;
      localStorage.setItem("tomorrowTodos", JSON.stringify(state.tomorrow));
    },
    addTomorrowTodo: (state, action) => {
      state.tomorrow.push(action.payload);
      localStorage.setItem("tomorrowTodos", JSON.stringify(state.tomorrow));
    },
    deleteTomorrowTodo: (state, action) => {
      state.tomorrow = state.tomorrow.filter(
        (todo) => todo.id !== action.payload
      );
      localStorage.setItem("tomorrowTodos", JSON.stringify(state.tomorrow));
    },
    checkTomorrowTodo: (state, action) => {
      state.tomorrow = state.tomorrow.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
      localStorage.setItem("tomorrowTodos", JSON.stringify(state.tomorrow));
    },
    // thisWeek
    setThisWeekTodos: (state, action) => {
      state.thisWeek = action.payload;
      localStorage.setItem("thisWeekTodos", JSON.stringify(state.thisWeek));
    },
    addThisWeekTodo: (state, action) => {
      state.thisWeek.push(action.payload);
      localStorage.setItem("thisWeekTodos", JSON.stringify(state.thisWeek));
    },
    deleteThisWeekTodo: (state, action) => {
      state.thisWeek = state.thisWeek.filter(
        (todo) => todo.id !== action.payload
      );
      localStorage.setItem("thisWeekTodos", JSON.stringify(state.thisWeek));
    },
    checkThisWeekTodo: (state, action) => {
      state.thisWeek = state.thisWeek.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
      localStorage.setItem("thisWeekTodos", JSON.stringify(state.thisWeek));
    },
  },
});

export const {
  setTodayTodos,
  addTodayTodo,
  deleteTodayTodo,
  checkTodayTodo,
  setTomorrowTodos,
  addTomorrowTodo,
  deleteTomorrowTodo,
  checkTomorrowTodo,
  setThisWeekTodos,
  addThisWeekTodo,
  deleteThisWeekTodo,
  checkThisWeekTodo,
} = todoSlice.actions;
export default todoSlice.reducer;
