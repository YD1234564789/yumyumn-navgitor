export default function RestaurantItem({ id, name, address, price_level }){

    //<p>地址：${place.vicinity}</p>
    //<p>價位：${place.price_level}</p>
    //<p>評分：${place.rating} (${place.user_ratings_total}則評論)</p>

    return(
        <div>
            <div className="card text-dark  bg-light mb-1">
                <div className="row g-0">
                    <div className="col-md-3 d-flex align-items-center justify-content-center" >
                        <img className="rounded" src="" />
                    </div>
                    <div className="col-md-9 ">
                        <div id="place-name"className="card-header"><i className="fa-solid fa-star"></i><i className="fa-regular fa-star"></i>🌳{name}</div>
                        <div className="card-body d-flex justify-content-between">
                            <div>
                                <p>地址：{address}</p>
                                <p>價位：{price_level}</p>
                            </div>
                            <div>
                                <button className="btn btn-secondary btn-sm" type="button" data-bs-toggle="offcanvas" data-bs-target={`#r${id}`} aria-controls="offcanvas">更多</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="offcanvas offcanvas-start" tabIndex="-1" id={`r${id}`} aria-labelledby={id}>        
                <div id="carouselExample" className="carousel slide">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="" className="d-block w-100" alt="..." />
                        </div>
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
                    <h5 className="offcanvas-title" id="${place.place_id}Label">{name}</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div>
                        <p>價格：{price_level}</p>
                        <p>餐廳類型：</p>
                    </div>
                    <div>
                        <p>地址：{address}</p>
                        <p>營業時間：</p>
                        <p>網址：</p>
                        <p>電話：</p>
                        <div className="dropdown mt-3">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
                                Dropdown button
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>   
        </div>
    )
}

/*
    return(
        <div>
            <div className="card text-dark  bg-light mb-1">
                <div className="row g-0">
                    <div className="col-md-3 d-flex align-items-center justify-content-center" >
                        <img className="rounded" src="${place.photos[0].getUrl({ maxWidth: 150, maxHeight: 150 })}" />
                    </div>
                    <div className="col-md-9 ">
                        <div id="place-name"className="card-header"><i className="fa-solid fa-star"></i><i className="fa-regular fa-star"></i>{name}</div>
                        <div className="card-body d-flex justify-content-between">
                            <div>
                                <p>地址：{address}</p>
                                <p>價位：{price_level}</p>
                            </div>
                            <div>
                                <button className="btn btn-secondary btn-sm" type="button" data-bs-toggle="offcanvas" data-bs-target="#${place.place_id}" aria-controls="offcanvas">更多</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="${place.place_id}" aria-labelledby="${place.place_id}Label">        
                <div id="carouselExample" className="carousel slide">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="..." className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="..." className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="..." className="d-block w-100" alt="..." />
                        </div>
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
                    <h5 className="offcanvas-title" id="${place.place_id}Label">{name}</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div>
                        <p>價格：{price_level}</p>
                        <p>餐廳類型：</p>
                    </div>
                    <div>
                        <p>地址：</p>
                        <p>營業時間：</p>
                        <p>網址：</p>
                        <p>電話：</p>
                        <div className="dropdown mt-3">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
                                Dropdown button
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>   
        </div>
    )
*/