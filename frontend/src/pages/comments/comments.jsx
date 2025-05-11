import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Comments = (props) => {
  const  eventId = props.id;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");
  const name = localStorage.getItem("name");
  useEffect(() => {
    setLoading(true);
    console.log("token is "+token)
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/events/getcomment/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => {
        setComments(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
        setLoading(false);
      });
  }, [eventId]);

  const handleAddComment = () => {
    if (newComment.length === 0) {
      return;
    }
    setLoading(true);
    console.log(userId);
    axios
    .post(`${process.env.REACT_APP_API_URL}/api/events/postcomment`, null, {
      params: {
        msg: newComment,
        user_id: userId,
        event_id: eventId,
      },
      headers: {
        Authorization: `Bearer ${token}`, // Add the Bearer token here
        "Content-Type": "application/json", // Optional
      },
    })
    .then((response) => {
      console.log("Comment posted successfully:", response.data);
      setComments(response.data);
      setNewComment("");
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error posting comment:", error.response || error.message);
    });

  //  window.location.reload();
  };

  return (
    <>
   <div className="p-6 max-w-2xl mx-auto bg-black rounded-lg shadow-md">
      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold text-white-800 mb-4">Comments</h1>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <ul className="space-y-3">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="p-3 border rounded-md bg-gray-50 shadow-sm"
              >
                <strong className="text-blue-600">{comment.username}</strong>:{" "}
                <span className="text-gray-700">{comment.msg}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center space-x-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={`Add a comment by: ${name}`}
              className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddComment}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
  
};

export default Comments;
