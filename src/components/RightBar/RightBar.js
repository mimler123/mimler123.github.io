import React from 'react';
import "./RightBar.css";

export default function RightBar() {
    return (
        <div className="RightBar">
            <div className="TitleBox">
                <p className="Title">DEEPWOKEN</p>
                <p className="TitleDes">INTERACTIVE MAP</p>
                <p className="TitleVersion">V - 1.0 / 15.05.2021</p>
            </div>
            <hr className="wide" />
            <div className="leave">
            <button className="joinBtn">JOIN GUILD</button>
            <button className="createBtn">CREATE GUILD</button>
            </div>
            <hr className="wide" />

        </div>
    )
}
