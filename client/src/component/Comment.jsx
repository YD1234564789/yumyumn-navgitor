import {useState} from 'react'
import StarRating from './Main/StarRating'

export default function Comments ({ data=[] }) {
    return (
        <div>
            {data.map((review, index) => (
                <CommentCollection key={index} {...review} />
            ))}
        </div>
    )
}
const CommentCollection = ({ author_name, rating, text, relative_time_description, profile_photo_url, author_url }) => {
    const [showFullText, setShowFullText] = useState(false)
    const toggleText = () => {
        setShowFullText(!showFullText)
    }

    return (
        <div className="reviewlist border-top mb-3" >
            <div className="">
                <div className="d-flex align-items-center ">
                    <img src={profile_photo_url} className="my-2 me-2" alt=""  />
                    <a href={author_url} className='text-secondary text-decoration-none'>{author_name}</a>
                </div>

                <div className="d-flex text-muted">
                    {StarRating(rating)}　{relative_time_description}
                </div>
                <div>
                    <span className="card-text">
                        {showFullText ? text : `${text.slice(0, 50)}...`}
                    </span>
                    <span>
                        <button className="btn btn-sm text-primary" onClick={toggleText}>
                            {showFullText ? '收合' : '全文'}
                        </button>
                    </span>
                </div>
            </div>
        </div>
    )
}
