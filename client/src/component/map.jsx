import { GoogleMap,InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api"
import { useState, useEffect, useContext, useRef } from "react";
import { InformContext } from "../context/InformContext";
import StarRating from "./StarRating"
import PriceLevel from "./PriceLevel"

const containerStyle = {
    width: '600px',
    height: '600px'
};

export default function MapConstructor(){
    const [zoom, setZoom] = useState(7)
    const { userlocation, setUserlocation, mapCenter, setMapCenter, restaurantsResult, setRestaurantsResult, searchr } = useContext(InformContext)
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
        switch (searchr.distance) {
            case "100":
                setZoom(16);
                break;
            case "300":
                setZoom(16);
                break;
            case "600":
                setZoom(15);
                break;
            case "1000":
                setZoom(15);
                break;
            case "3000":
                setZoom(14);
                break;
            default:
                return;
        }
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

    const restaurants = () => {
        if (restaurantsResult) {
            const restaurant = restaurantsResult.map(restaurant => {
                return (
                    <div key={restaurant.place_id} id={restaurant.place_id} search="true">
                        <Marker position={restaurant.geometry.location}
                        onClick={()=>{
                            setSelectedMarker(restaurant)
                            console.log('restaurant', restaurant)
                            console.log("mapCenter", mapCenter)
                            console.log("selectedMarker", selectedMarker)
                        }}
                        />
                    </div> 
                )
            })

            return restaurant
        } else {
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
       
                    // 我的位置的infowindow接收不了格式
                    setSelectedMarker(mapCenter)
                }} />
                {restaurants()}
                {selectedMarker && (
                    <InfoWindow
                        position={selectedMarker.geometry.location === userlocation ? userlocation : selectedMarker.geometry.location}
                        options={{pixelOffset: new window.google.maps.Size(0, -40)}}
                        onCloseClick={()=> setSelectedMarker(null)}>
                        <div>
                            {selectedMarker.geometry.location === userlocation ?(
                                <div>我的位置</div>
                            ):(
                                <>
                                <h5>店名：{selectedMarker.name}</h5>
                                <div>地址：{selectedMarker.vicinity}</div>
                                <div className="d-flex">{selectedMarker.rating}{StarRating(selectedMarker.rating)}({selectedMarker.user_ratings_total}則評論)。{PriceLevel(selectedMarker.price_level)}</div>
                                </>
                            )}
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