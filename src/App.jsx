import { Route, Routes } from "react-router-dom";
import Container from "./components/Container";
import Login from "./components/Login/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<Container />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
