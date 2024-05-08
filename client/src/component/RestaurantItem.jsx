import { useState, useContext } from "react";
import { ChosenRestaurant, LikeRestaurant, UnlikeRestaurant } from "../api/RestApi";
import { InformContext } from "../context/InformContext";
import RestItemDetail from "./RestItemDetail";
import StarRating from "./StarRating"
import PriceLevel from "./PriceLevel"


export default function RestaurantItem ({ id, search, api_key, name, isFavorite, img, address, price_level, rating, user_ratings_total, comment, openNow, location, onAdd, onDelete}){
    const { setfavoriteList, setMapCenter } = useContext(InformContext)
    let item =""
    const [rest, setRest] = useState()
    const ChosenRestaurantAsync = async () => {
        try {
            const favorites = await ChosenRestaurant(id);
            setRest(favorites.data)
        } catch (error) {
            console.error(error);
        }
    };
    const handleClick = async () => { 
        ChosenRestaurantAsync()
    };
    const handleLike = async() => {
        const Alldata = await LikeRestaurant({
            restaurantName:name,
            address:address,
            priceLevel:price_level,
            restaurantId:id,
            photo:img,
            location,
            userRatingsTotal: user_ratings_total,
            rating
        })
        onAdd(Alldata, id)
        alert(`${Alldata.message}`)
    }
    const handleUnlike = async() => {
        const Alldata=await UnlikeRestaurant({
            restaurantId: id
        })
        onDelete(id)
        setfavoriteList(Alldata)
        alert(`${Alldata.message}`)
    }
    const handleEnter = () => {
        if (location) {
            setMapCenter({ lat: location.lat, lng: location.lng })
        }        
    }
    if (search==="true"){
        item= 
            <div>
                <div className="d-flex">
                    {rating}{StarRating(rating)}({user_ratings_total}則評論){PriceLevel(price_level)}
                </div>
                <div className={openNow === "營業中" ? 'openNow' : 'closeNow'}>{openNow}</div>
                <div>
                    {address}
                </div>
            </div>
    }else{
        item= 
            <div>
                <div className="d-flex">
                    {rating}{StarRating(rating)}({user_ratings_total}則評論){PriceLevel(price_level)}
                </div>
                <div>{address}</div>
                <div>備註：{comment}</div>
            </div>        
    }
    return(
        <div>
            <div className="card text-dark  bg-light mb-1">
                <div className="row g-0" onMouseEnter={handleEnter}>
                    <div className="col-md-3 d-flex align-items-center justify-content-center" >
                        <img className="rounded" src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=150&photo_reference=${img}&key=${api_key} ` } alt="" />
                    </div>
                    <div className="col-md-9 ">
                        <div id="place-name"className="card-header" >{isFavorite ? <i className="fa-solid fa-heart" onClick={handleUnlike} ></i> :<i className="fa-regular fa-heart" onClick={handleLike} ></i>}{name}</div>
                        <div className="card-body d-flex justify-content-between">
                            {item}
                            <div>
                                <button className="btn btn-secondary btn-sm" type="button" onClick={handleClick} data-bs-toggle="offcanvas" data-bs-target={`#${search}${id}`} aria-controls="offcanvas">更多</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <RestItemDetail id={id} api_key={api_key} data={rest} search={search} />
        </div>
    )
}
