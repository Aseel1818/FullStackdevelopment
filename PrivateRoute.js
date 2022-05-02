import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect,Route } from 'react-router-dom';

export default function PrivateRoute ({component:component, ...rest}){
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
  <Route
  {...res}
  render={(props)=>
    userInfo ? (
        <component{...props}></component>
    ):(<Redirect to="/signin"/>
    )
  }
    ></Route>
  );
}