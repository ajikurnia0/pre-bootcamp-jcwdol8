import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getPostComments } from "../utils/axios/commentAPIs";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  // comments: any
  postId: any;
};
const Comments = ({ postId }: Props) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getPostComments(postId).then((res) => {
      setComments(res.comments);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <h1>
        Loading comments...
        <Toaster />
      </h1>
    );
  }

  return (
    <div className="pt-2">
      <Toaster />
    </div>
  );
};

export default Comments;
