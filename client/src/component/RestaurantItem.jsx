import { useState, useContext } from "react";
import { ChosenRestaurant, LikeRestaurant, UnlikeRestaurant, ChangeComment } from "../api/RestApi";
import { InformContext } from "../context/InformContext";
import RestItemDetail from "./RestItemDetail";
import StarRating from "./StarRating"
import PriceLevel from "./PriceLevel"



export default function RestaurantItem ({ id, search, api_key, name, isFavorite, img, address, price_level, rating, user_ratings_total, comment, openNow, location, onAdd, onDelete, onComment}){

    const { setfavoriteList, setMapCenter } = useContext(InformContext)
    const [postContent, setPostContent] = useState(comment);
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
            // mapRef.current.panTo({ lat: location.lat, lng: location.lng })
        }        
    }
    const handleChangeComment = async() => {
        await ChangeComment({
            restaurantId:id,
            comment:postContent,
        })
        onComment(postContent, id)
    }
    if (search==="true"){
        item= 
            <div>
                <div className="d-flex">
                    {rating}{StarRating(rating)}({user_ratings_total}則評論){PriceLevel(price_level)}
                </div>
                <div className={openNow === "營業中" ? 'openNow' : 'closeNow'}>{openNow}</div>
                <div>{address}</div>
            </div>
    }else{
        item= 
            <div>
                <div className="d-flex">
                    {rating}{StarRating(rating)}({user_ratings_total}則評論){PriceLevel(price_level)}
                </div>
                <div>地址：{address}</div>
                <div className="comment">
                    備註：
                    <div>{comment}</div>
                    <i className="fa-regular fa-pen-to-square" data-bs-toggle="modal" data-bs-target={`#${id}Backdrop`}></i>
                </div>
                <div className="modal fade" id={`${id}Backdrop`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">留言修改</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <textarea value={postContent} onChange={e => setPostContent(e.target.value)} />               
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setPostContent(comment)} >取消</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => {
                                    console.log(id, postContent)
                                    handleChangeComment()
                                }} >確定修改</button>
                            </div>
                        </div>
                    </div>
                </div>            
            </div>        
    }
    return(
        <div>
            <div className="card text-dark  bg-light mb-1">
                <div className="row g-0" onMouseEnter={handleEnter}>
                    <div className="col-md-3 d-flex align-items-center justify-content-center img-area" >
                        <img className="rounded " src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=150&photo_reference=${img}&key=${api_key} ` } alt="" />
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
