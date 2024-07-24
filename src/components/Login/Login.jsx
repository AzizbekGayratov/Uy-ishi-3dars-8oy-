import React, { useState, useContext, useEffect } from "react";
import Img from "/login.png";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import { Vortex } from "react-loader-spinner";

const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const login = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://uy-ishi-2dars-8oy.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName, password }),
        }
      );

      if (response.status === 401) {
        throw new Error("Invalid username or password");
      } else if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setUser(data);
      saveUser(data);
      navigate("/");
    } catch (err) {
      setError(err.message);
      console.error("There was an error!", error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div id="login" className="bg-loginBgColor">
      <div className="max-w-[1215px] mx-auto px-[15px]">
        {loading ? (
          <>
            <Vortex
              visible={true}
              height="280"
              width="280"
              ariaLabel="vortex-loading"
              wrapperStyle={{}}
              wrapperClass="vortex-wrapper"
              colors={["green", "green", "green", "green", "green", "green"]}
            />
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-[25px]">
              <div className="max-w-[500px] h-auto">
                <img src={Img} alt="img" />
              </div>
              <div className="bg-white rounded-[40px] flex flex-col  justify-center">
                <div className="max-w-[300px] mx-auto">
                  <h1 className="text-black font-oswald font-bold text-[36px] leading-[53px]">
                    Sign in
                  </h1>
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-[23px] mt-[45px]"
                  >
                    <input
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      type="text"
                      className="login_input"
                      placeholder="Username"
                      required
                    />
                    <div className="relative">
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        className="login_input"
                        placeholder="Password"
                        required
                      />
                      {!showPassword ? (
                        <AiOutlineEye
                          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-[20px] text-secondary"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-[20px] text-secondary"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="text-center py-[8px] bg-btnColor rounded-[10px] font-inter text-[15px] leading-[19px] font-semibold "
                    >
                      {loading ? "In progress..." : "Sign in"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
