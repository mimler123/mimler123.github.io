import React from 'react';
import "./LeftBar.css";
import TitleImg from "./TITLE.png";

export default function LeftBar() {
    return (
        <div id="LeftBar">
            <div className="header">
               <img id="title" src={TitleImg} alt="DEEPWOKENMAP" />
            </div>
        </div>
    )
}
