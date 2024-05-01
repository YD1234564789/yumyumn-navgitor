export default function Comment ({data=[]}) {
    const CommentCollection = () => {
        console.log(data.reviews)
        if(data.reviews){
            const reviewlist = data.reviews.map((item) =>{
                return(
                    <div>
                        <h3>{item.author_name}</h3>
                        <p>評價：{item.rating}</p>
                        <p>{item.text}</p>
                    </div>                    
                )                
            })
            return reviewlist
        }else{return}      
    }
    return(
        <div className="reviewlist">
            {CommentCollection()}
        </div>        
    )
}