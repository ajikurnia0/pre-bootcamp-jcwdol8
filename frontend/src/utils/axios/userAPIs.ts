import { Message, WindowSharp } from "@mui/icons-material";
import { useRef } from "react";
import axios from "axios";

import toast, { Toaster } from "react-hot-toast";

const baseURL = process.env.REACT_APP_BACKEND_BASE_URL;
const userURL = process.env.REACT_APP_BACKEND_USER_URL;

export const registerNewUser = async (
  email: string,
  fullName: string,
  userName: string,
  password: string,
  repeatPassword: string
) => {
  try {
    let response = await axios.post(`${baseURL}${userURL}/register`, {
      email: email,
      fullName: fullName,
      userName: userName,
      password: password,
    });
    if (password !== repeatPassword) {
      return toast("Confirm Password Wrong");
    }
    if (!email.includes("@gmail.com")) {
      return toast("Wrong Input Email");
    }
    console.log(response.data);

    // Save user json data to localStorage
    toast(response.data.message);
    toast("Sign Up Success");

    window.location.reload();
    // return response;
  } catch (error) {
    // window.alert(error);
    toast(error.response.data.message);
    console.log(error);
  }
};

export const loginUser = async (userNameOrEmail: string, password: string) => {
  try {
    await axios
      .post(`${baseURL}${userURL}/login`, {
        // email: email,
        text: userNameOrEmail,
        password: password,
      })
      .then(function (response) {
        console.log(response.data);
        const token = response.data.token;
        // Save user json data to localStorage
        localStorage.setItem("token", JSON.stringify(token));
        toast("Sign In Success");
        window.location.reload();
        return response;

        // return response
      });
  } catch (error) {
    toast(error.response.data.message);
  }
};

export const getUserbyUsername = async (userName: any) => {
  try {
    const fetchUser = await axios.get(`${baseURL}${userURL}/${userName}`);
    const data = fetchUser.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const followUser = async (userName: any) => {
  try {
    await axios
      .post(`${baseURL}${userURL}/${userName}/follow`)
      .then((res) => window.alert(res));
  } catch (error) {
    console.log(error);
  }
};

export const unfollowUser = async (userName: any) => {
  try {
    await axios
      .post(`${baseURL}${userURL}/${userName}/unfollow`)
      .then((res) => window.alert(res));
  } catch (error) {
    console.log(error);
  }
};

export const searchUsers = async (searchTerm: string) => {
  try {
    const response = await axios.post(`${baseURL}${userURL}/search`, {
      searchTerm,
    });
    const results = response.data;
    // Update the component state with the search results
    return results;
  } catch (error) {
    console.error(error);
  }
};
