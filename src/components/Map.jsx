import React from "react";
import { useState } from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/Map.css";

const center = [43.8563, 18.4131];

const Map = ({ apiKey }) => {
	const [activeLayer, setActiveLayer] = useState("temp_new");

	const getLayerURL = (layer) => {
		return `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${apiKey}`;
	};

	const handleLayerChange = (layer) => {
		setActiveLayer(layer);
	};

	return (
		<MapContainer className="map-container" center={center} zoom={5}>
			<LayersControl position="topright">
				<LayersControl.BaseLayer checked={true} name="OpenStreetMap">
					<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				</LayersControl.BaseLayer>
				<LayersControl.Overlay
					checked={activeLayer === "temp_new"}
					name="Temperature"
					onClick={() => handleLayerChange("temp_new")}
				>
					<TileLayer url={getLayerURL("temp_new")} />
				</LayersControl.Overlay>
				<LayersControl.Overlay
					checked={activeLayer === "wind_new"}
					name="Wind"
					onClick={() => handleLayerChange("wind_new")}
				>
					<TileLayer url={getLayerURL("wind_new")} />
				</LayersControl.Overlay>
				<LayersControl.Overlay
					checked={activeLayer === "clouds_new"}
					name="Clouds"
					onClick={() => handleLayerChange("clouds_new")}
				>
					<TileLayer url={getLayerURL("clouds_new")} />
				</LayersControl.Overlay>
				<LayersControl.Overlay
					checked={activeLayer === "precipitation_new"}
					name="Precipitation"
					onClick={() => handleLayerChange("precipitation_new")}
				>
					<TileLayer url={getLayerURL("precipitation_new")} />
				</LayersControl.Overlay>
			</LayersControl>
		</MapContainer>
	);
};

export default Map;
