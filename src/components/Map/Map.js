import React, { useEffect, useState } from "react";
import "./Map.css";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle,
} from "react-google-maps";
import { compose, withProps } from "recompose";
import SharedLocations from "../../services/locations";
import SharedRerender from "../../services/rerender";

export default function Mapp() {
  const { locations, setLocations } = SharedLocations();
  const { rerender, setRerender } = SharedRerender();
  const [r, setr] = useState(0);

  var repeatOnXAxis = false;

  useEffect(() => {
    setr(Math.random());
    console.log("Locations changed -> rerender will be called");
  }, rerender);

  function getNormalizedCoord(coord, zoom) {
    if (!repeatOnXAxis) return coord;

    var y = coord.y;
    var x = coord.x;

    // tile range in one direction range is dependent on zoom level
    // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
    var tileRange = 1 << zoom;

    // don't repeat across Y-axis (vertically)
    if (y < 0 || y >= tileRange) {
      return null;
    }

    // repeat across X-axis
    if (x < 0 || x >= tileRange) {
      x = ((x % tileRange) + tileRange) % tileRange;
    }

    return {
      x: x,
      y: y,
    };
  }

  const google = window.google;
  const customMapType = new google.maps.ImageMapType({
    getTileUrl: function (coord, zoom) {
      var normalizedCoord = getNormalizedCoord(coord, zoom);
      if (
        normalizedCoord &&
        normalizedCoord.x < Math.pow(2, zoom) &&
        normalizedCoord.x > -1 &&
        normalizedCoord.y < Math.pow(2, zoom) &&
        normalizedCoord.y > -1
      ) {
        return (
          "//mimler123.github.io/tiles/" +
          zoom +
          "_" +
          normalizedCoord.x +
          "_" +
          normalizedCoord.y +
          ".jpg"
        );
      } else {
        return "./tiles/empty.jpg";
      }
    },
    tileSize: new google.maps.Size(256, 256),
    maxZoom: 3,
    minZoom: 0,
    name: "PS_Bramus.GoogleMapsTileCutter",
  });

  let iconone = new google.maps.MarkerImage(
    "https://mimler123.github.io/static/media/icon1.png",
    null /* size is determined at runtime */,
    null /* origin is 0,0 */,
    null /* anchor is bottom center of the scaled image */,
    new google.maps.Size(32, 32)
  );
  const MapComponent = compose(
    withProps({
      googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyB_kyttiO8LQnnhNv_7c_P1Q47op3cGQ3E&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `100vh` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )((props) => (
    <GoogleMap
      onClick={(e) => console.log(e.latLng.lat() + " // " + e.latLng.lng())}
      defaultZoom={2}
      defaultCenter={{ lat: 0, lng: 0 }}
      defaultMapTypeId="custom"
      defaultOptions={{
        maxZoom: 6,
        mapTypeControlOptions: {
          mapTypeIds: ["custom"],
        },
      }}
      mapTypeId="custom"
      defaultExtraMapTypes={[["custom", customMapType]]}
    >
      {locations
        .filter((l) => l.visible === true)
        .map((loc) => (
          <Marker
            position={{ lat: loc.position[0], lng: loc.position[1] }}
            icon={iconone}
          />
        ))}
    </GoogleMap>
  ));

  return (
    <div className="map" id="map">
      <MapComponent />
    </div>
  );
}
