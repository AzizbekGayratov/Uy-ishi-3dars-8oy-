import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ setSearch }) => {
  const navigate = useNavigate();
  useEffect(() => {
    setSearch(true);
  }, []);
  return (
    <div className="w-full h-[93.5vh] rounded-[40px] bg-bgColor">
      <div className="w-full h-full flex flex-col gap-[50px] items-center justify-center">
        <h2 className="font-oswald text-[36px] font-semibold leading-[53px]">
          Wellcome to ToDoPy
        </h2>
        <p className="max-w-[490px] text-center font-notoSans text-[15px] leading-[20px]">
          A to-do app is a simple, user-friendly digital tool designed to help
          individuals and teams organize tasks and manage their daily activities
          efficiently. Users can create, edit, and prioritize tasks, set
          deadlines or reminders, categorize items, and track their progress,
          all within an intuitive and accessible interface. These apps are
          essential for improving productivity, reducing stress, and ensuring
          that important responsibilities are not forgotten.
        </p>
        <button
          onClick={() => {
            navigate("/calendar");
          }}
          className="text-center font-oswald text-[24px] leading-[36px] rounded-[10px] py-[8px] px-[80px] bg-btnColor font-semibold"
        >
          Go to tasks
        </button>
      </div>
    </div>
  );
};

export default Home;
