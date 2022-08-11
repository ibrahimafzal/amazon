import React, { useContext } from 'react'
import "./Rightheader.css"
import Avatar from '@mui/material/Avatar';
import { LoginContext } from "../context/ContextProvider";
import { NavLink, useNavigate} from 'react-router-dom';
import { Divider } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';




const Rightheader = () => {

    const { account, setAccount } = useContext(LoginContext);

    const history = useNavigate();

    const logoutUser = async () => {
        const res2 = await fetch("/logout", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include"
        });
    
        const data2 = await res2.json();
        console.log(data2);
    
        if (res2.status !== 201) {
          console.log("error");
        } else {
          console.log("data valid");
          // alert("User Logout")
          history("/");
          setAccount(false)
        }
      };


    return (
        <>
            <div className="rightheader">
                <div className="right_nav">
                    {
                        account ?
                            <Avatar className="avtar2"> {account.fname[0].toUpperCase()} </Avatar> : <Avatar className="avtar"></Avatar>
                    }

                    {account ? <h3>Hello, {account.fname.toUpperCase()}</h3> : ""}
                </div>
                <div className="nav_btn">
                    <NavLink to="/"> Home </NavLink>
                    <NavLink to="/"> Shop by Category </NavLink>

                    <Divider style={{ width: "100%", marginLeft: "-20px" }} />

                    <NavLink to="/"> Today's Deal </NavLink>
                    {
                        account ? <NavLink to="/buynow"> Your Orders </NavLink> : <NavLink to="/login"> Your Orders </NavLink>
                    }

                    <Divider style={{ width: "100%", marginLeft: "-20px" }} />

                    <div className="flag">
                        <NavLink to="/"> Settings </NavLink>
                        <img src="./pakistan.png" alt="pakistan-flag" style={{width:30,marginLeft:10}}/>
                    </div>

                    {
                        account ?
                            <div className='flag'>

                                <LogoutIcon style={{ fontSize: 18, marginRight: 4 }} />
                               
                                <h3 onClick={logoutUser}
                                    style={{ cursor: "pointer", fontWeight: 500 }}>
                                    Logout
                                </h3>

                            </div> :
                            <NavLink to="login">Sign in</NavLink>
                    }

                </div>
            </div>
        </>
    )
}

export default Rightheader;
