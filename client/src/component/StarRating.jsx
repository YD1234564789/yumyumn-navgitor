
export default function StarRating(rating) {
  const stars = []

  // 根據評分數量動態生成星星 icon
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<i key={i} className="fa-solid fa-star" style={{color: "#FFD43B" }} ></i>) // full star
    } else if (i - rating < 0.5) {
      stars.push(<i key={i} className="fa-solid fa-star-half" style={{ color: "#FFD43B" }}></i>) // half star
    } else {
      stars.push(<i key={i} className="fa-solid fa-star" style={{ color: "#d1d8e6" }}></i>) // empty star
    }
  }
  // <i class="fa-solid fa-star" style="color: #d1d8e6;"></i>
  return <div>{stars}</div>
};  
