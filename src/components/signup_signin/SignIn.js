import React, { useState, useContext } from 'react'
import "./signIn_signUp.css"
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from "../context/ContextProvider"


const SignIn = () => {

  const [logData, setLogData] = useState({
    email: "",
    password: ""
  });
  console.log(logData);

  const history = useNavigate();

  const { account, setAccount } = useContext(LoginContext);


  const addData = (e) => {
    const { name, value } = e.target;

    setLogData(() => {
      return {
        ...logData,
        [name]: value
      }
    })
  };

  const sendLoginDetails = async (e) => {
    e.preventDefault();

    const { email, password } = logData;

    const res = await fetch("login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    });
    const data = await res.json();
    console.log(data);

    if (res.status === 400 || !data) {
      console.log("invalid login details")
      toast.warn("Invalid details", {
        position: "top-center",
      })
    } else {
      console.log("login details valid");
      setAccount(data);
      toast.success("User Login successfully", {
        position: "top-center",
      })
      setLogData({ ...logData, email: "", password: "" })
      history("/");
    }
  }

  return (
    <section>
      <div className='sign_container'>

        <div className="sign_header">
          <img src="./blacklogoamazon.png" alt="amazonlogo" />
        </div>

        <div className="sign_form">
          <form method="POST">
            <h1>Sign-in</h1>

            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input type="email"
                onChange={addData}
                value={logData.email}
                name='email' id='email' />
            </div>

            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input placeholder='At least 6 characters'
                onChange={addData}
                value={logData.password}
                type="password" name='password' id='password' />
            </div>

            <button className='signin_btn' onClick={sendLoginDetails}>Continue</button>

          </form>
        </div>
        <div className="create_accountinfo">
          <p>New To Amazon?</p>
          <NavLink to="/register">
            <button>Create Your Amazon Account</button>
          </NavLink>
        </div>
      </div>
      <ToastContainer />
    </section>
  )
}

export default SignIn