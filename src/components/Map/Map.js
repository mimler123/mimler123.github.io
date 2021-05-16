import React, { Component } from "react";
import OlMap from "ol/Map";
import OlView from "ol/View";
import Projection from 'ol/proj/Projection';
import Static from 'ol/source/ImageStatic';
import ImageLayer from 'ol/layer/Image';
import OlLayerTile from "ol/layer/Tile";
import OlSourceOSM from "ol/source/OSM";
import Control from "ol/control/Control";
import ControlAtt from "ol/control/Attribution"

class PublicMap extends Component {
  constructor(props) {
    super(props);

    this.state = { center: [530, 480], zoom: 3 };

    this.extend = [0, 0, 1024, 968];
    this.projection = new Projection({
        code: 'xkcd-image',
        units: 'pixels',
        extent: this.extend,
      });

    this.olmap = new OlMap({
      target: null,
      layers: [
        new ImageLayer({
            source: new Static({
                attributions: '',
                url: 'https://mimler123.github.io/OCEAN.png',
                projection: this.projection,
                imageExtent: this.extend,
            })
        })
      ],
      view: new OlView({
          projection: this.projection,
        center: this.state.center,
        zoom: this.state.zoom
      }),
      controls: [
          
      ]
    });
  }

  updateMap() {
    this.olmap.getView().setCenter(this.state.center);
    this.olmap.getView().setZoom(this.state.zoom);
  }

  componentDidMount() {
    this.olmap.setTarget("map");

    // Listen to map changes
    this.olmap.on("moveend", () => {
      let center = this.olmap.getView().getCenter();
      let zoom = this.olmap.getView().getZoom();
      this.setState({ center, zoom });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let center = this.olmap.getView().getCenter();
    let zoom = this.olmap.getView().getZoom();
    if (center === nextState.center && zoom === nextState.zoom) return false;
    return true;
  }

  userAction() {
    this.setState({ center: [546000, 6868000], zoom: 5 });
  }

  render() {
    this.updateMap(); // Update map on render?
    return (
      <div id="map" style={{ width: "78%", height: "100vh", backgroundColor: "#2b2b2b" }}>
        
      </div>
    );
  }
}

export default PublicMap;
