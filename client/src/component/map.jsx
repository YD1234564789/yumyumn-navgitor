import { GoogleMap,InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api"
import { useState, useEffect, useContext } from "react";
import { InformContext } from "../context/InformContext";

const containerStyle = {
    width: '600px',
    height: '600px'
};

export default function MapConstructor(){
    const [zoom, setZoom] = useState(7)
    const { setUserlocation, mapCenter, setMapCenter } = useContext(InformContext)
    const [selectedMarker, setSelectedMarker] = useState("");

    useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setMapCenter({ lat: latitude, lng: longitude });
                setUserlocation({ lat: latitude, lng: longitude });
                setZoom(17)
            },
            (error) => {
                console.error('Error getting user location:', error);
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
    }, []);

    const YOUR_API_KEY=process.env.REACT_APP_GOOGLE_MAPS_KEY
    const { isLoaded } = useJsApiLoader({
        id: "123",
        googleMapsApiKey: YOUR_API_KEY
    })
    const handleCenterMapToUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setMapCenter({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };
    return isLoaded && (
        <div id="map-container">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={mapCenter}
                zoom={zoom}
            >
                <Marker position={mapCenter} onClick={() => {
                    console.log("mapCenter",mapCenter)
                    console.log("selectedMarker",selectedMarker)
                    setSelectedMarker(mapCenter)
                }} />
                {selectedMarker && (
                    <InfoWindow
                    position={mapCenter}
                    options={{
                        pixelOffset: new window.google.maps.Size(0, -40),
                    }}
                    >
                        <div>
                            <h6>店名：</h6>
                            <p>地址：</p>
                            <p>價位：</p>
                            <p>評分：(評論數)</p>
                            <button>close</button>
                        </div>
                    </InfoWindow>
                )}
                <button className="reload" onClick={handleCenterMapToUserLocation}>
                    我的位置
                </button>
            </GoogleMap>
        </div>
    ) 
}