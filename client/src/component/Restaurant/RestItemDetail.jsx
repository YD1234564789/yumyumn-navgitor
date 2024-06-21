import Comments from "../Comment";
import StarRating from "../Main/StarRating"
import PriceLevel from "../Main/PriceLevel"

export default function RestItemDetail ({id, api_key, data=[], search}) {
    function openHour() {
        if (data.opening_hours){
            const hours = data.opening_hours.weekday_text.map ( (hour, index) => {
                return (
                    <p key={index}>{hour}</p>
                )  
            })
            return hours
        }
    }
    function photosCollection() {
        if (data.photos){
            const photos = data.photos.map ((photo, index) => {
                if (photo === data.photos[0]){
                    return (
                        <div className="carousel-item active" key={index}>
                            <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photo_reference=${photo.photo_reference}&key=${api_key}`} className="d-block w-100" alt="..." />
                        </div>
                    )
                }else{
                    return (
                        <div className="carousel-item" key={index}>
                            <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photo_reference=${photo.photo_reference}&key=${api_key}`} className="d-block w-100" alt="..." />
                        </div>
                    )
                }    
            })
            return photos
        }
    }
    return (
        <div className="offcanvas offcanvas-start" tabIndex="-1" id={`${search}${id}`} aria-labelledby={id}>        
            <div id={`${search}${id}photo`} className="carousel slide">
                <div className="carousel-inner">
                    {photosCollection()}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target={`#${search}${id}photo`} data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target={`#${search}${id}photo`} data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id={`${id}Label`}>{data.name}</h5>
                <div className="offcanvas-subtitle" >{data.rating} {StarRating(data.rating)} ({data.user_ratings_total})．{PriceLevel(data.price_level)}</div>
            </div>

            <div className="offcanvas-body">
                <p><i className="info fa-lg fa-solid fa-location-dot"></i> 地址：{data.formatted_address}</p>    
                <div className="accordion">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                <i className="info fa-lg fa-regular fa-calendar-days"></i><span className={data.openNow === "營業中"? 'openNow' :'closeNow' }>{data.openNow}</span>．營業時間
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" >
                            <div className="accordion-body">
                                {openHour()}
                            </div>
                        </div>
                    </div>
                </div>
                <p><i className="info fa-lg fa-solid fa-earth-americas"></i>網址：<a href={data.website} target="_blank" rel="noreferrer">{data.parsedUrl}</a></p>
                <p><i className="info fa-lg fa-solid fa-phone"></i>電話：{data.formatted_phone_number}</p>
                <Comments data={data.reviews} />
            </div>
        </div> 
    )
}
