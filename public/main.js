let map
let pos
let service
let markers = []
let infowindow
let highlightMarker = null
// 初始化地圖
async function initMap () {
  const { Map } = await google.maps.importLibrary("maps")
  map = new Map(document.getElementById("map"), {
    center: { lat: 23.553118, lng: 121.0211024 },
    zoom: 7
  })
  navigator.geolocation.getCurrentPosition(position => {
    pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    map.setCenter(pos)
    map.setZoom(16)
    console.log('pos', pos)
    document.getElementById('latitude').value = pos.lat
    document.getElementById('longitude').value = pos.lng
  })
  infowindow = new google.maps.InfoWindow()
  
  google.maps.event.addListener(map, 'click', function () {
    infowindow.close();
  });

  // 創建location按鈕與功能
  const locationButton = document.createElement("button")

  locationButton.textContent = "我的位置"
  locationButton.classList.add("custom-map-control-button")
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton)
  locationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          infowindow.setPosition(pos)
          infowindow.setContent("目前位置")
          infowindow.open(map)
          map.setCenter(pos)
          map.setZoom(17)
        },
        () => {
          handleLocationError(true, infowindow, map.getCenter())
        }
      )
    } else {
      handleLocationError(false, infowindow, map.getCenter())
    }
  })
}

// 未授權定位錯誤處理
function handleLocationError (browserHasGeolocation, infowindow, pos) {
  infowindow.setPosition(pos)
  infowindow.setContent(
    browserHasGeolocation ? "Error: The Geolocation service failed." : "Error: Your browser doesn't support geolocation."
  )
  infowindow.open(map)
}

// 更新選取的價格等級
function updatePriceLevel () {
  const selectedPriceLevel = document.getElementById('priceLevel').value
  document.getElementById('priceOutput').textContent = selectedPriceLevel
}

// 搜索功能
function searchPlaces() {
  // 取得選擇的商家類別
  const category = document.getElementById('type').value
  const distance = parseInt(document.getElementById('distance').value)
  const rating = parseInt(document.getElementById('rating').value)
  const priceLevel = parseInt(document.getElementById('priceLevel').value)
  const latitude = document.getElementById('latitude').value
  const longitude = document.getElementById('longitude').value
  const request = {
    location: new google.maps.LatLng(latitude, longitude),
    radius: distance,
    type: 'restaurant',
    keyword: `${ category } + 餐廳`,
    minRating: rating,
    minPriceLevel: '0',
    maxPriceLevel: priceLevel,
    openNow: true
  }
  service = new google.maps.places.PlacesService(map)
  service.nearbySearch(request, callback)
}

// 處理後回傳結果
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    // 清除先前的marker和infoWindow
    clearMarkers()
    console.log('results', results)
    // 加入marker和infowindow
    results.forEach((place, i) => {
      const marker = new google.maps.Marker({
        position: place.geometry.location,
        map,
        title: `${i + 1}. ${place.name}`,
        label: `${i + 1}`,
        placeId: place.place_id
      })

      marker.addListener('click', () => {
        showInfoWindow(place, marker)
      })

      markers.push(marker)
    })
    // 顯示文字結果於search-results區塊
    renderSearchResults(results)
  } else {
    // 如無搜索結果
    console.log('status', status)
    const searchResult = document.getElementById('search-results')
    searchResult.innerHTML = '此條件無搜索結果'
  }
}

//清除marker和infowindow
function clearMarkers() {
  markers.forEach(marker => {
    marker.setMap(null)
    infowindow.close()
  })
  markers = []
}
//店家詳細資料
//Html部分還沒套用detail資料
function resultDetail(placeId){
  console.log(placeId)
  let request = {
    placeId
  }
  let service = new google.maps.places.PlacesService(map);
  service.getDetails(request, callbackdetail)
}

function callbackdetail(results, status) {  
  console.log('resultsDetail', results)
}
// 結果印出在右側
function renderSearchResults(data) {
  const searchResult = document.getElementById('search-results')
  let html = ''
  console.log(data)  
  data.forEach((place, i) => {
    resultDetail(place.place_id)
    html += `
      <div class="card text-dark  bg-light mb-1" onmouseover="highlight('${place.place_id}')">
        <div class="row g-0">
          <div class="col-md-3 d-flex align-items-center justify-content-center" >
            <img class="rounded" src="${place.photos[0].getUrl({ maxWidth: 150, maxHeight: 150 })}" style="max-height: 100%; max-width: 100%;">  
          </div>
          <div class="col-md-9 ">
            <div id="place-name"class="card-header"><i class="fa-regular fa-star"></i>${i + 1}.${place.name}</div>
            <div class="card-body d-flex justify-content-between">
              <div>
                地址：${place.vicinity}<br>
                價位：${place.price_level}<br>
                評分：${place.rating} (${place.user_ratings_total}則評論)<br>
              </div>
              <div>
                <button class="btn btn-secondary btn-sm" type="button" data-bs-toggle="offcanvas" data-bs-target="#${place.place_id}" aria-controls="offcanvas">更多</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="offcanvas offcanvas-start" tabindex="-1" id="${place.place_id}" aria-labelledby="${place.place_id}Label">        
        <div id="carouselExample" class="carousel slide">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="..." class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="..." class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="..." class="d-block w-100" alt="...">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="${place.place_id}Label">${place.name}</h5>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <div>
            <p>rating ${place.rating}星  評論數：${place.user_ratings_total}則評論  價格：${place.price_level}</p>
            <p>餐廳類型：</p>
          </div>
          <div>
            <p>地址：</p>
            <p>營業時間：</p>
            <p>網址：</p>
            <p>電話：</p>
            <div class="dropdown mt-3">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
                Dropdown button
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `
  })
  searchResult.innerHTML =  html
}

// Place Details 詳細資料
// function moreDetails(placeId) {
//   console.log('placeId', placeId)
//   const request = {
//     placeId
//     // fields: ['name', 'rating']
//   }
//   service = new google.maps.places.PlacesService(map)
//   service.getDetails(request, (place, status) => {
//     if (status === google.maps.places.PlacesServiceStatus.OK) {
//      const offcanvas = document.querySelector('#offcanvas')
//       const offcanvasId = 'offcanvas_' + place.place_id;
//       offcanvas.innerHTML = `
//         <div class="offcanvas offcanvas-start" tabindex="-1" id="${offcanvasId}" aria-labelledby="${place.place_id}Label">
//     <div class="offcanvas-header">
//       <h5 class="offcanvas-title" id="${place.place_id}Label">Offcanvas</h5>
//       <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
//     </div>
//     <div class="offcanvas-body">
//       <div>
//        etc.
//       </div>
//       <div class="dropdown mt-3">
//         <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
//           Dropdown button
//         </button>
//       </div>
//     </div>
//   </div>
//       `
//     } else { console.log('錯誤')}
//   }
// }

// 顯示infowindow
function showInfoWindow(place, marker) {
  infowindow.setContent(
    `<h6> ${place.name}</h6>
    <div>地址：${place.vicinity}</div>
    <div>價位：${place.price_level}</div>
    <div>分數：${place.rating} (${place.user_ratings_total}則評論)</div>
    `
    )
  infowindow.open({
    anchor: marker,
    map
  })
}

// 監聽mouseover的餐廳
function highlight(placeId) {
  const targetMarker = markers.find(marker => marker.placeId === placeId)
  
  // 如果找到了，並且不是目前高亮的 marker，就將地圖中心點移到該 marker
  if (targetMarker && targetMarker !== highlightMarker) {
    map.panTo(targetMarker.getPosition())
    // map.setZoom(17)
    highlightMarker = targetMarker
  }
}