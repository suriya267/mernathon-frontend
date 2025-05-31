import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { currentState, setCurrentState, form, onChange, onSubmitHandler } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const [isValid, setValid] = useState(true);
  const [turnSubmit, setTurnSubmit] = useState(false)

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  const handlePasswordValidation = (event) => {
    event.preventDefault();
    setValid(passwordRegex.test(form.password))
    setTurnSubmit(true)
  }

  useEffect(() => {
    if (form.password !== "" && isValid === true) {
      onSubmitHandler()
    }
  }, [isValid, turnSubmit])

  return (
    <form
      onSubmit={handlePasswordValidation}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mt-10 mb-2">
        <p className="text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState !== "Login" &&
        <input
          type="name"
          name="name"
          value={form.name}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="FullName"
          required
        />}

      <input
        type="email"
        name="email"
        value={form.email}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="hello@gmail.com"
        required
      />

      <input
        type="password"
        name="password"
        value={form.password}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />

      {!isValid && <p style={{ color: "red" }}>
        Password must be at least 8 character long, include 1 number 1 uppercase letter.
      </p>}

      <div className="flex justify-between w-full text-sm mt-[-8px]">
        <p
          className="cursor-pointer"
          onClick={() => navigate("/forgotpassword")}
        >
          Forgot your password?
        </p>
        <p
          onClick={() =>
            setCurrentState(currentState === "Login" ? "Sign Up" : "Login")
          }
          className="cursor-pointer text-blue-600"
        >
          {currentState === "Login" ? "Create a new account" : "Login here"}
        </p>
      </div>

      <button
        type="submit"
        className="px-8 py-2 mt-4 font-light text-white bg-black"
      >
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
