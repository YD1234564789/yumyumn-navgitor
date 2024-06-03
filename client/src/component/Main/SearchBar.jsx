import { useContext } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import { InformContext } from "../../context/InformContext";
import { SearchApi } from '../../api/SearchApi';

//react-bootstrap-range-slider website
//https://www.npmjs.com/package/react-bootstrap-range-slider
//react-bootstrap-range-slider example
//https://codesandbox.io/p/sandbox/react-7pkgg?file=%2Fsrc%2Fstyles.css%3A61%2C1-67%2C2

export default function SearchBar(){  
  const { searchr, setSearchr, setRestaurantsResult, userlocation, setMapCenter } = useContext(InformContext)

  const Seekbar = () => {
    return (
      <div className='range_slider'>
        <RangeSlider
          value={searchr.priceLevel}
          onChange={changeEvent => {
            setSearchr({ ...searchr, priceLevel:changeEvent.target.value})
          }}
          step={1} min={1} max={5}
          bsPrefix='bar'
        />
      </div>
    );  
  };
  
  const handleClick = async () => { 
    const Alldata= await SearchApi({
      type:searchr.type,
      distance:searchr.distance,
      rating:searchr.rating,
      priceLevel:searchr.priceLevel,
      latitude: userlocation.lat,
      longitude: userlocation.lng,
      // latitude: 25.0478592,
      // longitude: 121.5234048,
    })
    setMapCenter ({ lat: userlocation.lat, lng: userlocation.lng })
    setRestaurantsResult(Alldata.data)
    switch (searchr.distance) {
      case "100":
        setSearchr({ ...searchr, zoom:16})
        break;
      case "300":
        setSearchr({ ...searchr, zoom:15.5})
        break;
      case "600":
        setSearchr({ ...searchr, zoom:15})
          break;
      case "1000":
        setSearchr({ ...searchr, zoom:15})
          break;
      case "3000":
        setSearchr({ ...searchr, zoom:14})
          break;
      default:
        return;
    }
  };
  return (
    <div id="filterForm">
      <label>
        餐廳類別：
        <select name="type" value={searchr.type}
          onChange={e => {
            setSearchr({ ...searchr, [e.target.name]:e.target.value})
        }}>
          <option value="" title="顯示所有類別">全部</option>
          <option value="咖啡廳" title="以咖啡、茶和輕食為主的場所">咖啡廳</option>
          <option value="燒烤店" title="以烤肉、燒烤為主的餐廳">燒烤店</option>
          <option value="甜點店" title="專門提供各種甜點和甜品的店鋪">甜點店</option>
          <option value="速食餐廳" title="提供快速餐點的餐廳，如漢堡店、炸雞店等">速食餐廳</option>
          <option value="日式料理" title="壽司店、拉麵店、刺身店等">日式料理</option>
          <option value="義式料理" title="義大利餐廳，披薩、義大利麵等">義式料理</option>
          <option value="中式料理" title="中國各省的特色菜餚，如川菜、粤菜、湘菜等">中式料理</option>
          <option value="西式料理" title="法國、德國、西班牙等國的菜式">西式料理</option>
          <option value="印度料理" title="印度特色的咖哩、香料風味的菜餚">印度料理</option>
          <option value="泰式料理" title="泰國風味的料理，有辣味、酸甜味等">泰式料理</option>
          <option value="素食餐廳" title="提供素食或純素食選擇的餐廳">素食餐廳</option>
          <option value="海鮮餐廳" title="以各種海鮮菜餚為主">海鮮餐廳</option>
          <option value="墨西哥料理" title="包括塔可、墨西哥捲餅等">墨西哥料理</option>
        </select>
      </label>
      <label>
        選擇搜索距離：
        <select name="distance" value={searchr.distance}
          onChange={e => {
            setSearchr({ ...searchr, [e.target.name]:e.target.value})
        }}>
          <option value="100" title="100 公尺">100 公尺</option>
          <option value="300" title="300 公尺">300 公尺</option>
          <option value="600" title="600 公尺">600 公尺</option>
          <option value="1000" title="1 公里">1 公里</option>
          <option value="3000" title="3 公里">3 公里</option>
        </select>
      </label>
      <label>
        評分：
        <select name="rating" value={searchr.rating}
          onChange={e => {
            setSearchr({ ...searchr, [e.target.name]:e.target.value})
        }}>
          <option value="1" title="1分以上">1分以上</option>
          <option value="2" title="2分以上">2分以上</option>
          <option value="3" title="3分以上">3分以上</option>
          <option value="4" title="4分以上">4分以上</option>
        </select>
      </label>        
      <label>價格等級：</label>
      <Seekbar />
      <button className="btn btn-primary btn-sm" onClick={handleClick}>搜尋餐廳</button>
    </div>
  )
}