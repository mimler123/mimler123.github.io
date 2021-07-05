import React, { Component, useState, useRef, useEffect } from "react";
import OlMap from "ol/Map";
import OlView from "ol/View";
import Projection from "ol/proj/Projection";
import Static from "ol/source/ImageStatic";
import ImageLayer from "ol/layer/Image";
import OlVector from "ol/layer/Vector";
import OlVectorSource from "ol/source/Vector";
import OlFeature from "ol/Feature";
import OlCircle from "ol/geom/Circle";
import OlPoint from "ol/geom/Point";
import Locations from "../../services/locations";
import VectorLayer from "ol/layer/Vector";
import Firebase from "../../services/firebase";
import Fetched from "../../services/fetched";
import OlIcon from "ol/style/Icon";
import OlStyle from "ol/style/Style";
import OlStyleCircle from "ol/style/Circle";
import OlFill from "ol/style/Fill";

export default function Map(props) {
  const { locations } = Locations();
  const { fetched } = Fetched();

  const [map, setMap] = useState();
  const [featuresLayer, setFeaturesLayer] = useState();
  const [selectedCoord, setSelectedCoord] = useState();

  const [loggedIn, setLoggedIn] = useState(false);
  const [fetchedFeatures, setFetchedFeatures] = useState(false);

  Firebase.auth().onAuthStateChanged((user) => {
    if (user && loggedIn === false) {
      setLoggedIn(true);
    } else if (!user && loggedIn === true) {
      setLoggedIn(false);
    }
  });

  const mapElement = useRef();

  useEffect(() => {
    var Style = new OlStyle({
      image: new OlStyleCircle({
        radius: 10,
        fill: new OlFill({ color: "black" }),
      }),
    });
    var features = [];
    var markerLayer;
    if (loggedIn && !fetchedFeatures && fetched) {
      features = locations.map(
        (loc) =>
          new OlFeature({
            id: loc.name,
            name: loc.name,
            geometry: new OlPoint([loc.position[0], loc.position[1]]),
          })
      );
      console.log(features);
      setFetchedFeatures(true);
      markerLayer = new OlVector({
        source: new OlVectorSource({
          features: features,
        }),
      });

      console.log(markerLayer);
    } else if (!loggedIn && fetchedFeatures) {
      console.log("Made rescan avail");
      setFetchedFeatures(false);
      markerLayer = new OlVector();
      return;
    } else {
      console.log("Not found");
      return;
    }

    const initialFeaturesLayer = new OlVector({
      source: new OlVectorSource(),
    });
    const initialMap = new OlMap({
      target: mapElement.current,
      layers: [
        new ImageLayer({
          source: new Static({
            attributions: "",
            url: "https://mimler123.github.io/OCEAN.png",
            projection: new Projection({
              code: "xkcd-image",
              units: "pixels",
              extent: [0, 0, 1024, 968],
            }),
            imageExtent: [0, 0, 1024, 968],
          }),
        }),
      ],
      view: new OlView({
        projection: new Projection({
          code: "xkcd-image",
          units: "pixels",
          extent: [0, 0, 1024, 968],
        }),
        center: [500, 400],
        zoom: 3,
      }),
      controls: [],
    });
    initialMap.addLayer(markerLayer);

    setMap(initialMap);
    setFeaturesLayer(initialFeaturesLayer);
  }, [locations]);

  if (map !== undefined) {
    map.on("click", (evt) => {
      console.log(evt.pixel);
      var feature = map.forEachFeatureAtPixel(evt.pixel, (feature) => {
        return feature;
      });
      if (feature !== undefined) {
        console.log(feature.values_.id);
        var tt = document.createElement("p");
        const ttt = document.createTextNode(feature.values_.id);
        tt.appendChild(ttt);
      } else {
        return;
      }
    });
  }

  return (
    <div
      id="map"
      ref={mapElement}
      className="map-container"
      style={{
        width: "90vw",
        height: "100vh",
        backgroundColor: "#2b2b2b",
        position: "absolute",
        right: "0px",
        zIndex: "0",
      }}
    ></div>
  );
}
