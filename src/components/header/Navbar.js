import React, { useContext, useEffect, useState } from 'react';
import "./navbar.css"
import SearchIcon from "@mui/icons-material/Search"
import Badge from "@mui/material/Badge"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import { NavLink, useNavigate } from 'react-router-dom';
import { LoginContext } from "../context/ContextProvider";
import Rightheader from "./Rightheader";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector } from "react-redux"


const Navbar = () => {

  const { account, setAccount } = useContext(LoginContext);
  console.log("account", account);


  const history = useNavigate();


  // here is avatar Dropmenu function which is copy from "material ui"
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [text, setText] = useState("");
  const [listOpen, setListOpen] = useState(true);

  const { products } = useSelector(state => state.getproductsdata);


  const [drawerOpen, setDrawerOpen] = useState(false)

  const getdetailvaliduser = async () => {
    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    const data = await res.json();
    console.log(data);

    if (res.status !== 201) {
      console.log("error");
    } else {
      console.log("data valid");
      setAccount(data)
    }
  };

  const handleOpen = () => {
    setDrawerOpen(true);
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false);

  }


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

  const getText = (items) => {
    setText(items);
    setListOpen(false);
  }


  useEffect(() => {
    getdetailvaliduser();
  }, [])


  return (
    <header>
      <nav>
        <div className="left">

          <IconButton className="hamburgur" onClick={handleOpen}>
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>

          {/* there is left menu bar in between <Drawer> */}
          <Drawer open={drawerOpen} onClick={handleDrawerClose}>
            <Rightheader/>
          </Drawer>

          <div className="navlogo">
            <NavLink to="/">
              <img src="./amazon.png" alt="" />
            </NavLink>
          </div>
          <div className="nav_searchbaar">
            <input type="text" name="" id=""
              placeholder='Search your products'
              onChange={(e) => getText(e.target.value)} />
            <div className="search_icon">
              <SearchIcon id="search" />
            </div>

            {/* Search filter */}

            {text &&
              <List className="extraSearch" hidden={listOpen}>
                {
                  products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                    <ListItem>
                      <NavLink to={`/getproductsone/${product.id}`} onClick={() => setListOpen(true)}>
                        {product.title.longTitle}
                      </NavLink>
                    </ListItem>
                  ))
                }
              </List>
            }

          </div>
        </div>

        <div className="right">
          <div className="nav_btn">
            <NavLink to="/login">Sign in</NavLink>
          </div>
          {
            console.log(account)
          }
          <div className="cart_btn">

            {
              account ?
                <NavLink to="/buynow">
                  <Badge badgeContent={account.carts.length} color="primary">
                    <ShoppingCartIcon id="icon" />
                  </Badge>
                </NavLink> :
                <NavLink to="/login">
                  <Badge badgeContent={0} color="primary">
                    <ShoppingCartIcon id="icon" />
                  </Badge>
                </NavLink>
            }

            <p>Cart</p>
          </div>
          {
            account ?
              <Avatar className="avtar2"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                {account.fname[0].toUpperCase()}
              </Avatar> :
              <Avatar className="avtar"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}></Avatar>
          }
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>My account</MenuItem>
            {
              account ? <MenuItem onClick={() => { handleClose(); logoutUser(); }}><LogoutIcon style={{ fontSize: 16, marginRight: 3 }} />Logout</MenuItem> : ""
            }
          </Menu>
        </div>
      </nav>
    </header>
  )
}

export default Navbar