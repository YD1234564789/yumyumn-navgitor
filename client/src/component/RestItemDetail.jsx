import Comment from "./Comment";

export default function RestItemDetail ({id, api_key, data=[], search}) {
    function openHour() {
        if (data.opening_hours){
            const hours = data.opening_hours.weekday_text.map ( hour => {
                return (
                    <p>{hour}</p>
                )  
            })
            return hours
        }
    }
    function photosCollection() {
        if (data.photos){
            const photos = data.photos.map (photo => {
                if (photo === data.photos[0]){
                    return (
                        <div className="carousel-item active">
                            <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=150&photo_reference=${photo.photo_reference}&key=${api_key}`} className="d-block w-100" alt="..." />
                        </div>
                    )
                }else{
                    return (
                        <div className="carousel-item">
                            <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=150&photo_reference=${photo.photo_reference}&key=${api_key}`} className="d-block w-100" alt="..." />
                        </div>
                    )
                }    
            })
            return photos
        }
    }
    return (
        <div className="offcanvas offcanvas-start" tabIndex="-1" id={`${search}${id}`} aria-labelledby={id}>        
            <div id="carouselExample" className="carousel slide">
                <div className="carousel-inner">
                    {photosCollection()}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id={`${id}Label`}>{data.name}</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <p><i className="fa-solid fa-dollar-sign"></i>價格：{data.price_level}</p>
                <p><i className="fa-solid fa-utensils"></i>餐廳類型：</p>
                <p><i className="fa-solid fa-location-dot"></i> 地址：{data.formatted_address}</p>                    
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                <i className="fa-regular fa-calendar-days"></i>營業時間
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                {openHour()}
                            </div>
                        </div>
                    </div>
                </div>
                <p><i className="fa-solid fa-globe"></i>網址：<a href={data.website} target="_blank" rel="noreferrer">{data.website}</a></p>
                <p><i className="fa-solid fa-phone"></i>電話：{data.formatted_phone_number}</p>
                <Comment data={data} />
            </div>
        </div> 
    )
}