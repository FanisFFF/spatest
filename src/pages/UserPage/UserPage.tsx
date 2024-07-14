import { Button, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import EditRow from "../../components/EditRow/EditRow";
import { DataType } from "../../types/DataType";
import "./user-page.styles.scss";
import PostInput from "../../components/PostInput/PostInputComponent";
import Post from "../../components/Post/post.component";
import NavBar from "../../components/NavBar/nav-bar.component";
import Feed from "../../components/Feed/Feed";
import Aside from "../../components/Aside/aside.component";

const UserPage = () => {
  return (
    <div className="main">
      <NavBar />
      <Feed />
      <Aside />
    </div>
  );
};

export default UserPage;
