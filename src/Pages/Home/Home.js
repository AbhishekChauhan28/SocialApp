import React from "react";
import Navbar from "../../Component/Navbar/Navbar";
import { useSelector } from 'react-redux';
import "./home.css";
import Leftbar from "../../Component/LeftSideContainer/leftbar";
import MainPost from "../../Component/MainPostContainer/MainPost";
import Rightbar from "../../Component/RightSideContainer/Rightbar";

export default function Home() {
    const userDetails = useSelector((state) => state.user);
    let user = userDetails.user
    console.log(user)
    return(
        <div className = "home">
            <Navbar />
            <div className="ComponentContainer">
                <Leftbar />
                <MainPost />
                <Rightbar />
            </div>
        </div>
    )
}