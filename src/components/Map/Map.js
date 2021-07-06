import React from "react";
import "./Map.css";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Map() {
  const Map = ReactMapboxGl({
    accessToken:
      "pk.eyJ1IjoibWltbGVyMTIzIiwiYSI6ImNrb3FldGJsbDBzcjIyb3N6cGJzdG1zMGUifQ.U2P7kCAnw3o1q4NRkWEDBg",
  });

  return (
    <div className="map" id="map">
      <Map
        style="mapbox://styles/mapbox/streets-v11"
        containerStyle={{
          height: "50vh",
          width: "50vw",
        }}
      >
        <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
        </Layer>
      </Map>
    </div>
  );
}
