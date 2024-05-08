
export default function PriceLevel(priceLevel) {
  const dollars = [];

  // 根據價格等級動態生成美元符號
  for (let i = 1; i <= 5; i++) {
    if (i <= priceLevel) {
      dollars.push(<i key={i} className="fa-solid fa-dollar-sign fa-sm" style={{ color: "#919cb1" }}></i>)
    }
  }

  return <div>{dollars}</div>;
}