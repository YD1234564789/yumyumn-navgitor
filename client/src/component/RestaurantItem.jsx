import { useState, useContext } from "react";
import { ChosenRestaurant, LikeRestaurant, UnlikeRestaurant } from "../api/RestApi";
import RestItemDetail from "./RestItemDetail";
import { InformContext } from "../context/InformContext";

export default function RestaurantItem({ id, search, api_key, name, isFavorite, img, address, price_level, rating, user_ratings_total, comment, location }){
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
        setfavoriteList(Alldata)
    }
    const handleUnlike = async() => {
        const Alldata=await UnlikeRestaurant({
            restaurantId:id
        })
        setfavoriteList(Alldata)
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
                <div className="row g-0">
                    <div className="col-md-3 d-flex align-items-center justify-content-center" >
                        {/* 我的最愛分頁可能沒傳入apikey所以圖片無法顯示 */}
                        <img className="rounded" src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=150&photo_reference=${img}&key=${api_key} ` } alt="" />
                    </div>
                    <div className="col-md-9 ">
                        <div id="place-name"className="card-header" onMouseEnter={handleEnter} >{isFavorite ? <i className="fa-solid fa-star" onClick={handleUnlike} ></i> :<i className="fa-regular fa-star" onClick={handleLike} ></i>}{name}</div>
                        <div className="card-body d-flex justify-content-between">
                            
                            {item}
                            <div>
                                <button className="btn btn-secondary btn-sm" type="button" onClick={handleClick} data-bs-toggle="offcanvas" data-bs-target={`#r${id}`} aria-controls="offcanvas">更多</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <RestItemDetail id={id} api_key={api_key} data={rest} />
        </div>
    )
}