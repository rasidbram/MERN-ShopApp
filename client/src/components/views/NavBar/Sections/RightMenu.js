/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Icon, Badge } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">SignIn <Icon type="login" /></a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">SignUp <Icon type="user-add" /></a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>

      {/* <Menu.Item key="history">
          <a href="/history">Hello {users.data.name}</a>
        </Menu.Item> */}

        <Menu.Item key="history">
          <a href="/history">Payment History <Icon type="history" /></a>
        </Menu.Item>

        <Menu.Item key="upload">
          <a href="/product/upload">Upload <Icon type="upload" /></a>
        </Menu.Item>

        <Menu.Item key="cart" style={{ paddingBottom: 3 }}>
          <Badge count={user.userData && user.userData.cart.length}>
            <a href="/user/cart" style={{ margin:'auto', color:'#667777'}}>
              <Icon type="shopping-cart" style={{ fontSize: 30, marginBottom: 3,textAlign:'center' }} />
            </a>
          </Badge>
        </Menu.Item>


        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout <Icon type="logout" /></a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

