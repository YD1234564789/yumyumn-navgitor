let map
let pos
let service
let markers = []
let infowindow

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
  service = new google.maps.places.PlacesService(map)
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
    service.nearbySearch(request, callback)
  };
// 處理後回傳結果
function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    // 清除先前的marker和infoWindow
    clearMarkers()
    console.log('results', results)
    // 加入marker和infowindow
    results.forEach(place => {
      const marker = new google.maps.Marker({
        position: place.geometry.location,
        map,
        title: place.name
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
    const searchResult = document.getElementById('search-results');
    searchResult.innerHTML = '此條件無搜索結果';
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

// 結果印出在右側
function renderSearchResults(data) {
  const searchResult = document.getElementById('search-results')
  let html = ''
  data.forEach(place => {
    html += `
      <div class="card text-dark  bg-light mb-1">
        <div class="row g-0">
          <div class="col-md-3 d-flex align-items-center justify-content-center" >
            <img class="rounded" src="${place.photos[0].getUrl({ maxWidth: 150, maxHeight: 150 })}" style="max-height: 100%; max-width: 100%;">  
          </div>
          <div class="col-md-9">
            <div class="card-header"><strong>${place.name}</strong></div>
            <div class="card-body">
              地址：${place.vicinity}<br>
              價格：${place.price_level}<br>
              評分：${place.rating} (${place.user_ratings_total}則評論)<br>
            </div>
          </div>
        </div>
      </div>
    `
  })
  searchResult.innerHTML =  html
}


// 顯示infowindow
function showInfoWindow(place, marker) {
  infowindow.setContent(`<strong> ${place.name}</strong><br>${place.vicinity}<br>價位：${place.price_level}<br>分數：${place.rating} (${place.user_ratings_total}則評論)`)
  infowindow.open({
    anchor: marker,
    map
  })
}
