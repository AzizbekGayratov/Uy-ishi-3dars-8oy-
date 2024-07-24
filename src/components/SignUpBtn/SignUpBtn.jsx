import React from "react";
import { FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SignUpBtn = ({ toggleValue, setToggleValue }) => {
  const navigate = useNavigate();
  const handleSignUp = () => {
    setToggleValue(!toggleValue);
    navigate("/login", { replace: true });
  };

  return (
    <button onClick={handleSignUp} className="flex items-center gap-[10px]">
      <FiLogIn size={20} />
      <span className="font-notoSans text-[20px] leading-[27px]">Sign Up</span>
    </button>
  );
};

export default SignUpBtn;
