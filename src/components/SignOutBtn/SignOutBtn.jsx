import { FiLogOut } from "react-icons/fi";
import React from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignOutBtn = ({ toggleValue, setToggleValue }) => {
  const { setUser } = React.useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    setToggleValue(!toggleValue);
    localStorage.removeItem("user");
    setUser(null);
    if (window.location.pathname !== "/") {
      navigate("/login", { replace: true });
    }
    toast.success("Sign Out Successful");
  };

  return (
    <button
      className="flex items-center gap-[10px]"
      onClick={() => handleSignOut()}
    >
      <FiLogOut size={20} />{" "}
      <span className="font-notoSans text-[20px] leading-[27px]">Sign Out</span>
    </button>
  );
};

export default SignOutBtn;
