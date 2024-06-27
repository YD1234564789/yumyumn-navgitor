export default function RestDetailPhoto ( photos ) {

    if (photos){
        photos.map ( photo => {
            if (photo === photos[0]){
                return (
                    <div className="carousel-item active">
                        <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=150&photo_reference=${img}&key=${api_key}`} className="d-block w-100" alt="..." />
                    </div>
                )
            }else{
                return (
                    <div className="carousel-item">
                        <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=150&photo_reference=${img}&key=${api_key}`} className="d-block w-100" alt="..." />
                    </div>
                )
            }

        })
    }
}