import { useState, useContext } from "react";
import { ChosenRestaurant, LikeRestaurant, UnlikeRestaurant } from "../api/RestApi";
import { InformContext } from "../context/InformContext";
import RestItemDetail from "./RestItemDetail";

export default function RestaurantItem ({ id, search, api_key, name, isFavorite, img, address, price_level, rating, user_ratings_total, comment, location, onAdd, onDelete}){
    const { setfavoriteList, setMapCenter } = useContext(InformContext)
    let item =""
    const [rest, setRest] = useState()
    const ChosenRestaurantAsync = async () => {
        try {
            const favorites = await ChosenRestaurant(id);
            setRest(favorites.data.result)
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
                <p>地址：{address}</p>
                <p>價位：{price_level}</p>
                <p>評分：{rating} ({user_ratings_total}則評論)</p>
            </div>        
    }else{
        item= 
            <div>
                <p>地址：{address}</p>
                <p>價位：{price_level}</p>
                <p>備註：{comment}</p>
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
                        <div id="place-name"className="card-header" >{isFavorite ? <i className="fa-solid fa-star" onClick={handleUnlike} ></i> :<i className="fa-regular fa-star" onClick={handleLike} ></i>}{name}</div>
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