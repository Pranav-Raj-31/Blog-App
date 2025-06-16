import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Blogs from "./Blogs";
import DeleteButton from "./DeleteBlogs";
import { makeStyles } from "@mui/styles";
import config from "../config";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px auto",
    width: "80%",
  },
  blogContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  blogImage: {
    width: "100%",
    height: "auto",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  editButton: {
    background: "#f0f0f0",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    fontSize: "14px",
  },
  deleteButton: {
    position: "absolute",
    right: 10,
    top: 10,
    color: "red",
    cursor: "pointer",
  },
}));

const UserBlogs = () => {
  const classes = useStyles();
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");

  const sendRequest = useCallback(async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/api/blogs/user/${id}`);
      return res.data;
    } catch (err) {
      console.error("Error fetching user blogs:", err);
    }
  }, [id]);

  useEffect(() => {
    sendRequest().then((data) => {
      if (data?.user) {
        setUser(data.user);
      }
    });
  }, [sendRequest]);

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`${config.BASE_URL}/api/blogs/${blogId}`);
      sendRequest().then((data) => setUser(data?.user));
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {user?.blogs?.map((blog, index) => (
        <div key={index} className={classes.blogContainer}>
          <Blogs
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={user.name}
          />
          <img
            className={classes.blogImage}
            src={blog.image}
            alt={blog.title}
          />
          <DeleteButton blogId={blog._id} onDelete={handleDelete} />
        </div>
      ))}
    </div>
  );
};

export default UserBlogs;
