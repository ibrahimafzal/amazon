import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignUp = () => {

  const [userData, setUserData] = useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: ""
  });

  console.log(userData);


  const addUserData = (e) => {
    const { name, value } = e.target;

    setUserData(() => {
      return {
        ...userData,
        [name]: value
      }
    })
  };

  const sendData = async (e) => {
    e.preventDefault();
    const { fname, email, mobile, password, cpassword } = userData;

    const res = await fetch("register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fname, email, mobile, password, cpassword
      })
    });

    const data = await res.json();
    // console.log(data);
    if(res.status === 422 || !data){
      toast.warn("Invalid details",{
        position: "top-center",
      })
    }else{
      toast.success("Data successfully added",{
        position: "top-center",
      })
      setUserData({...userData, fname:"", email:"", mobile:"", password:"", cpassword:""});
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
            <h1>Sign-Up</h1>

            <div className="form_data">
              <label htmlFor="fname">Your name</label>
              <input onChange={addUserData}
                value={userData.fname}
                type="text" name='fname' id='fname' />
            </div>

            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input onChange={addUserData}
                value={userData.email}
                type="email" name='email' id='email' />
            </div>

            <div className="form_data">
              <label htmlFor="number">Mobile</label>
              <input onChange={addUserData}
                value={userData.mobile}
                type="text" name='mobile' id='mobile' />
            </div>

            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input onChange={addUserData}
                value={userData.password}
                placeholder='At least 6 characters' type="password" name='password' id='password' />
            </div>

            <div className="form_data">
              <label htmlFor="password">Password Again</label>
              <input onChange={addUserData}
                value={userData.cpassword}
                type="password" name='cpassword' id='cpassword' />
            </div>

            <button className='signin_btn' onClick={sendData}>Continue</button>

            <div className="signin_info">
              <p>Already have an account?</p>
              <NavLink className="navlink" to="/login">
                Signin
              </NavLink>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </section>
  )
}

export default SignUp