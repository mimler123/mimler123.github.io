 // eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";
import React, { useRef, useState, useEffect } from 'react'
import SharedLocations from "../../services/locations";
import SharedRerender from "../../services/rerender";
import ColorToFilter from "../../math/colortofilter";

mapboxgl.accessToken = "pk.eyJ1IjoibWltbGVyMTIzIiwiYSI6ImNrb3FldGJsbDBzcjIyb3N6cGJzdG1zMGUifQ.U2P7kCAnw3o1q4NRkWEDBg";

export default function Map() {

    const {locations, setLocations} = SharedLocations();
    const {rerender, setRerender} = SharedRerender();

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(0.00);
    const [lat, setLat] = useState(0.00);
    const [zoom, setZoom] = useState(1);
    const [markers, setMarkers] = useState({});
    const [loaded, setLoaded] = useState(false);

    const markerClick = (id, lng, lat) => {
        map.current.flyTo({
            center: [lng, lat]
        })
    }

    useEffect(() => {
        if(map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            //style: "mapbox://styles/mapbox/streets-v11",
            style: {
                version: 8,
                sources: {
                    "deepwokenmap": {
                        type: "raster",
                        tiles: [
                            "https://mimler123.github.io/tiles/{z}_{x}_{y}.jpg"
                        ],
                        tileSize: 256,
                        attribution: "DEEPWOKEN NON-OFFICIAL MAP",
                        //bounds: [-100,-100,100,150]
                    }
                },
                layers: [
                    {
                        id: 'deepwokenmap',
                        source: 'deepwokenmap',
                        type: 'raster',
                        minzoom: 0,
                        maxzoom: 3
                    }
                ]
            },
            center: [lng, lat],
            zoom: zoom,
            maxZoom: 2.49,
            continuousWorld: false,
            noWrap: true,
            renderWorldCopies: false
        })
        
        
    })

    useEffect(() => {
        if(!map.current) return;

        map.current.on("move", () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2))
        });
        map.current.on("load", () => {
            console.log("MAP LOADED!");
            setLoaded(true);
        });
        map.current.on("click", markers[10], (e) => {
            console.log(e);
        })

        if(!loaded) return;

        locations.forEach((loc) => {
            if(markers[loc.id] !== undefined) {
                markers[loc.id].remove();
                markers[loc.id] = undefined;
            }
        })
        
        locations.filter((l) => l.visible === true).map((loc) => {
            var popup = new mapboxgl.Popup({ offset: 25 }).setText(loc.description);
            var markerElement = document.createElement('div');
            markerElement.className = 'marker';
            markerElement.style.backgroundImage = `url('https://mimler123.github.io/static/media/icon${loc.icon}.png')`;
            markerElement.onclick = () => {markerClick(loc.id, loc.position[0], loc.position[1])};
            if(loc.color[0] === 0 && loc.color[1] === 0 && loc.color[2] === 0) {
                //
            }else {
                markerElement.style.filter = ColorToFilter(loc.color[0], loc.color[1], loc.color[2]);
            }
            markers[loc.id] = new mapboxgl.Marker(markerElement).setPopup(popup).setLngLat([loc.position[0], loc.position[1]]).addTo(map.current)
        });
            
    }, [locations, rerender])
    return (
        <div>
            <div className="mapDebug">
                DEBUG: lng: {lng} lat: {lat} zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map"></div>
        </div>
    )
}
