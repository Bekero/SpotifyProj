import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userService } from "../services/user.service";
import { onLogin, onSignup } from "../store/user.actions";

export const LoginSignup = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    fullname: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
    // getUsers();
  // }, []);

  const getUsers = () => {
    // const users = userService.getUsers();
    // setUsers(users);
  };

  const clearState = () => {
    setCredentials({ username: "", password: "", fullname: "" });
    setIsSignup(false);
  };

  const handleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    setCredentials({ ...credentials, [field]: value });
  };

  const login = async (ev) => {
    ev.preventDefault()
    ev.stopPropagation()
    if (!credentials.username) return;
    try {
      await dispatch(onLogin(credentials));
      navigate("/");
      console.log("success");
    } catch (err) {
      console.log("errorrrr", err);
    }
    clearState();
  };

  const signup = async (ev) => {
    ev.preventDefault()
    ev.stopPropagation()
    if (!credentials.username || !credentials.password || !credentials.fullname)
      return;
    try {
      await dispatch(onSignup(credentials));
      navigate("/");
      console.log("success");
    } catch (err) {
      console.log("errorrrr", err);
    }
    clearState();
  };

  const toggleSignup = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className='login-page'>
      <div className='login-container'>
        <div className='login-signup'>
          <p>
            <button className='btn-link' onClick={toggleSignup}>
              {!isSignup ? "Create a new user" : "Already have a user"}
            </button>
          </p>
          <h1>Harmony</h1>
          <h2>Login to continue.</h2>
          {!isSignup && (
            <form className='login-form' onSubmit={login}>
              <input
                type='text'
                name='username'
                value={credentials.username}
                placeholder='Username'
                onChange={handleChange}
                required
                autoFocus
              />
              <input
                type='password'
                name='password'
                value={credentials.password}
                placeholder='Password'
                onChange={handleChange}
                required
              />
              <button>Login!</button>
            </form>
          )}
            {isSignup && (
              <form className='signup-form' onSubmit={signup}>
                <input
                  type='text'
                  name='fullname'
                  value={credentials.fullname}
                  placeholder='Fullname'
                  onChange={handleChange}
                  required
                />
                <input
                  type='text'
                  name='username'
                  value={credentials.username}
                  placeholder='Username'
                  onChange={handleChange}
                  required
                />
                <input
                  type='password'
                  name='password'
                  value={credentials.password}
                  placeholder='Password'
                  onChange={handleChange}
                  required
                />
                <button>Sign Up!</button>
              </form>
            )}
        </div>
      </div>
    </div>
  );
};
