import axios from "axios";

import {
  REGISTER_USER_SUCESS,
  REGISTER_USER_FAIL,
  SET_LOADING,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  FORGOT_PASS_SUCCESS,
  FORGOT_PASS_FAIL,
} from "../types/type";

export const registerUser = (userData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch({ type: SET_LOADING });
    const { data } = await axios.post("/api/auth/register", userData, config);

    dispatch({
      type: REGISTER_USER_SUCESS,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const { data } = await axios.get("/api/me");

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Update profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch({ type: SET_LOADING });
    const { data } = await axios.put("/api/me", userData, config);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Password forgotten
export const forgotPassword = (email) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch({ type: SET_LOADING });
    const { data } = await axios.post("/api/password/forgot", email, config);

    dispatch({
      type: FORGOT_PASS_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    console.log({ error });
    dispatch({
      type: FORGOT_PASS_FAIL,
      payload: error.response.data.message,
    });
  }
};
