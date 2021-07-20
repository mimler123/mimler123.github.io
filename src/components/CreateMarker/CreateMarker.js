import React, { useState } from 'react';
import "./CreateMarker.css";
import SharedSelCoords from "../../services/selCoords";
import SharedRerender from "../../services/rerender";

export default function CreateMarker() {

    const { selCoords, setSelCoords } = SharedSelCoords();
    const {rerender, setRerender} = SharedRerender();

    const [markerSelected, setMarkerSelected] = useState(1);

    const rInput = () => {
        if(isNaN(document.getElementById("markerColorR").value)) {
            document.getElementById("markerColorR").value = "";
        }
        if(document.getElementById("markerColorR").value.length > 2) {
            document.getElementById("markerColorG").focus();
        }
    }
    const gInput = () => {
        if(isNaN(document.getElementById("markerColorG").value)) {
            document.getElementById("markerColorG").value = "";
        }
        if(document.getElementById("markerColorG").value.length > 2) {
            document.getElementById("markerColorB").focus();
        }
    }
    const bInput = () => {
        if(isNaN(document.getElementById("markerColorB").value)) {
            document.getElementById("markerColorB").value = "";
        }
    }
    const nextMarker = () => {
        if(markerSelected < 3) setMarkerSelected(markerSelected + 1);
        if(markerSelected >= 3) setMarkerSelected(1);
    }
    const previousMarker = () => {
        if(markerSelected > 1) setMarkerSelected(markerSelected - 1);
        if(markerSelected <= 1) setMarkerSelected(3);
    }
    const createMarker = () => {
        var colorR = document.getElementById("markerColorR").value;
        var colorG = document.getElementById("markerColorG").value;
        var colorB = document.getElementById("markerColorB").value;
        var name = document.getElementById("markerName").value;
        var lng = document.getElementById("CoordX").value;
        var lat = document.getElementById("CoordY").value;
        
        if(isNaN(colorR) || isNaN(colorG) || isNaN(colorB) || isNaN(lng) || isNaN(lat)) return console.log("NaN");
        if(name.length < 1) return console.log("name < 1");
        if(!lng || !lat) return console.log("invalid pos: " + lng + " | " + lat);

        console.log(`DEBUG: CREATE MARKER WITH COLORS R${colorR} G${colorG} B${colorB} and name ${name} at pos ${lng},${lat}`);

    }
    const pickPos = () => {
        setSelCoords([true, 0, 0]);
        setRerender(!rerender);
        console.log("activated pick");
    }
    

    return (
        <div className="createMarker">
            <div className="rgbInputs">
                <input placeholder="R" onInput={rInput} id="markerColorR" className="markerColorR" maxLength="3" />
                <input placeholder="G" onInput={gInput} id="markerColorG" className="markerColorG" maxLength="3" />
                <input placeholder="B" inInput={bInput} id="markerColorB" className="markerColorB" maxLength="3" />
            </div>
            <div className="markerSymbol">
                <p className="markerSymbolTitle">Marker Symbol</p>
                <div className="markerImageDiv">
                    <button onClick={previousMarker} className="markerSymbolLeft">{"<"}</button>
                    <img className="markerImage" src={`https://mimler123.github.io/static/media/icon${markerSelected}.png`} />
                    <button onClick={nextMarker} className="markerSymbolRight">{">"}</button>
                </div>
                <input placeholder="NAME OF MARKER" id="markerName" className="markerName" maxLength="32" />
                <input placeholder="X" className="coordX" id="CoordX" maxLength="7" />
                <input placeholder="Y" className="coordY" id="CoordY" maxLength="7" />
                <button onClick={createMarker} className="createMarkerSubmit">CREATE MARKER [WIP]</button>
            </div>
        </div>
    )
}
