import { useState, useEffect, useContext } from "react";
import { getFavorite } from "../api/RestApi";
import { InformContext } from "../context/InformContext";
import RestaurantItem from "./RestaurantItem";
import MapConstructor from "./map";

export default function MainContainer(){
    const { restaurantsResult } = useContext(InformContext)
    const [ favorite, setFavorite ] = useState([]);
    const getFavoriteAsync = async () => {
        try {
            const favorites = await getFavorite();
            setFavorite(favorites.user.favoriteRestaurants);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getFavoriteAsync();
    }, []);
    const SearchCollection = restaurantsResult.map(data => {
        return (
            <RestaurantItem key={data.place_id} id={data.place_id} search="true" api_key={process.env.REACT_APP_GOOGLE_MAPS_KEY} name={data.name} img={data.photos[0].photo_reference} isFavorite={data.isFavorite} address={data.vicinity} price_level={data.price_level} rating={data.rating} user_ratings_total={data.user_ratings_total} location={data.geometry.location} />
        )
    })
    //記得加自己的備註
    const FavoriteCollection = favorite.map( data => {
        return (
            <RestaurantItem key={data._id} id={data._id} place_id={data.restaurantId} search="false" api_key={process.env.REACT_APP_GOOGLE_MAPS_KEY} name={data.restaurantName} img={data.photo} address={data.address} price_level={data.priceLevel} isFavorite= {data.isFavorite} comment={data.comment} />
        )
    })
    return (
        <div className="main-contain h-100">
            <div className="row main-wrapper">
                <MapConstructor />
                <div className="col result">
                    <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <button className="nav-link active" id="search-results-tab" data-bs-toggle="tab" data-bs-target="#search-results" type="button" role="tab" aria-controls="search-results" aria-selected="true">搜尋結果</button>
                            <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">我的最愛</button>
                        </div>
                    </nav>
                    <div className="tab-content overflow-auto" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="search-results" role="tabpanel" aria-labelledby="search-results-tab" tabIndex="0">
                            {SearchCollection}
                        </div>
                        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="search-results-tab" tabIndex="0">
                            {FavoriteCollection}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}