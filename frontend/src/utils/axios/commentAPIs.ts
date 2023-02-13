import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const baseURL = process.env.REACT_APP_BACKEND_BASE_URL;
const commentURL = process.env.REACT_APP_BACKEND_COMMENT_URL;

// @ts-ignore
const token = JSON.parse(localStorage.getItem("token"));

axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

export const addNewComment = async (postid: any, comment: string) => {
  try {
    const addComment = await axios
      .post(`${baseURL}${commentURL}/${postid}/addcomment`, {
        comment: comment,
      })

      .then((res) => toast(res.data.message));

    return addComment;
  } catch (err) {
    toast(err.response.data.message);
    console.log(err);
  }
};

export const getPostComments = async (postid: any) => {
  try {
    const getComments = await axios.get(
      `${baseURL}${commentURL}/${postid}/getcomments`
    );
    return getComments.data;
  } catch (err) {
    console.log(err);
  }
};
