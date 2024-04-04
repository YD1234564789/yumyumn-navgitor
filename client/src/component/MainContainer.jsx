import { useState, useEffect } from "react";
import { getFavorite } from "../api/RestApi";
import RestaurantItem from "./RestaurantItem";
import MapConstructor from "./map";

export default function MainContainer(){
    const [favorite, setFavorite] = useState([]);
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

    const FavoriteCollection = favorite.map( data => {
        return (
            <RestaurantItem key={data._id} id={data._id} name={data.restaurantName} address={data.address} price_level={data.priceLevel} />
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
                        <div className="tab-pane fade show active" id="search-results" role="tabpanel" aria-labelledby="search-results-tab" tabIndex="0"></div>
                        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="search-results-tab" tabIndex="0">
                            {FavoriteCollection}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}