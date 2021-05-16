import React from 'react';
import "./LeftBar.css";
import SearchImg from "./SearchImg.png";

export default function LeftBar() {
    return (
        <div id="LeftBar">
            <div className="header">
               <h1>DEEPWOKEN</h1>
               <h3>INTERACTIVE MAP</h3>
            </div>
            <hr />

            <div className="Visibillity">
                <button>SHOW ALL</button>
                <button>HIDE ALL</button>
            </div>

            <hr />
            <div className="s">
            <div className="searchBox">
                <input placeholder="SEARCH..." />
                <img src={SearchImg} alt="EYE" />
            </div>
            </div>
            <div className="Filters">
                <div className="Filter" id="Locations">
                    <p className="group">LOCATIONS</p>
                    <ul>
                        <li>
                            Test-Item
                        </li>
                        <li>
                            Test-Item
                        </li>
                    </ul>
                </div>
                <div className="Filter" id="Items">
                    <p className="group">ITEMS</p>
                    <ul>
                        <li>
                            Test-Item
                        </li>
                        <li>
                            Test-Item
                        </li>
                    </ul>
                </div>
                <div className="Filter" id="Quests">
                    <p className="group">QUESTS</p>
                    <ul>
                        <li>
                            Test-Item
                        </li>
                        <li>
                            Test-Item
                        </li>
                    </ul>
                </div>
                <div className="Filter" id="Members">
                    <p className="group">MEMBERS</p>
                    <ul>
                        <li>
                            Test-Item
                        </li>
                        <li>
                            Test-Item
                        </li>
                    </ul>
                </div>
                <div className="footer">
                    <p className="version">V - 1.0 / 16.05.21</p>
                    <div className="creditsBox">
                        <p className="creditsTitle">MADE BY</p>
                        <p className="credits">SAMSUNNY - MIMLER123</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
