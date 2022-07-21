import React,{ useEffect, useReducer } from "react";
import apiService from "../helpers/apiService";
import { AppContext } from "./app-context";
export default function AppState(props) {

  const initialState = {
    
    user: {
      id: "",
      role: "",
    },
  };

  function reducer(state, action) {
    switch (action.type) {
      case "UPDATE_INPUT":
        return {
          user: action.data,
        };

      default:
        return initialState;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(()=>{
  if(props.isAuthenticated){
    apiService.get("login").then((response)=>{
      dispatch({type:"UPDATE_INPUT",data:{id:response.data.id,role:response.data.role}});
    });
  }else{
    dispatch({type:""});
  }
  },[props.isAuthenticated]);
 
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
}
