import { GoogleMap,InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api"
import { useState, useEffect, useContext } from "react";
import { InformContext } from "../../context/InformContext";
import StarRating from "./StarRating"
import PriceLevel from "./PriceLevel"

const containerStyle = {
    width: '600px',
    height: '600px'
};

export default function MapConstructor(){
    const [zoom, setZoom] = useState(7)
    const { userlocation, setUserlocation, mapCenter, setMapCenter, restaurantsResult, searchr } = useContext(InformContext)
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

    useEffect(() => {
        setZoom(searchr.zoom)
    }, [restaurantsResult]);

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
                    setMapCenter({ lat: latitude, lng: longitude })                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };
    const CreateInfo = () =>{
        if (selectedMarker==="marker") {
            return(
                <InfoWindow
                    position={userlocation}
                    options={{
                        pixelOffset: new window.google.maps.Size(0, -40),
                    }}
                >
                    <div>我的位置</div>
                </InfoWindow>
            )
        }else if (selectedMarker){
            return(
                <InfoWindow
                    position={selectedMarker.geometry.location}
                    options={{
                        pixelOffset: new window.google.maps.Size(0, -40),
                    }}
                >
                    <div>
                        <h5>店名：{selectedMarker.name}</h5>
                        <div>地址：{selectedMarker.vicinity}</div>
                        <div className="d-flex">{selectedMarker.rating}{StarRating(selectedMarker.rating)}({selectedMarker.user_ratings_total}則評論)。{PriceLevel(selectedMarker.price_level)}</div>          
                    </div>
                </InfoWindow>
            )
        }else{
            return
        }
    }

    return isLoaded && (
        <div id="map-container">
            <GoogleMap
                mapContainerStyle={containerStyle} 
                center={mapCenter}
                zoom={zoom}
            >
                <Marker 
                    position={mapCenter} 
                    onClick={() => {       
                        setSelectedMarker(mapCenter)
                }} />            
                <div key="myplace">
                    <Marker
                        position={userlocation}
                        onClick={() => {
                            if(selectedMarker){
                                setSelectedMarker("")
                            }else{
                                setSelectedMarker("marker");
                            }                            
                        }}
                    />
                </div>
                {restaurantsResult.map((marker) => {
                    return (
                        <div key={marker.place_id}>
                            <Marker
                            position={marker.geometry.location}
                            onClick={() => {
                                if(selectedMarker){
                                    setSelectedMarker("")
                                }else{
                                    setSelectedMarker(marker);
                                }  
                            }}
                            />
                        </div>
                    );
                })}
                {CreateInfo()}
                <button className="reload" onClick={handleCenterMapToUserLocation}>我的位置</button>
            </GoogleMap>
        </div>
    ) 
}