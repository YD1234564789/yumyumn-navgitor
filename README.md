# YumYumNavigator

# 介紹

定位使用者所在地後，可搜尋附近的餐廳，並可加入我的最愛，及移除我的最愛中的項目

## 功能
- 註冊並同意獲取定位後開始使用(使用電腦建議使用WiFi定位誤差較小)。
- 依照條件搜索附近餐廳。
- 可將餐廳加入及移除最愛。
- 更多有餐廳較詳細的資訊，下午顯示打烊可能是非餐期。

## 開始使用
-
先確認已安裝 Node.JS 與 NPM 
將專案 clone 到本地資料夾
開啟兩個Terminal，分別到client與server資料夾內
- Server
1.安裝相關套件：
```
cd server
npm install
```
2.建立.env，設定環境變數：  
```
GOOGLE_MAPS_KEY=
MONGODB_URI=
JWT_SECRET=
```
3.建立種子資料：
```
npm run seed
```
4.運行：
```
node app.js
```

- Client
1.安裝相關套件
```
cd client
npm install
```
2.建立.env，設定環境變數：  
```
REACT_APP_GOOGLE_MAPS_KEY=
```
3.運行：
```
npm run start
```


分別成功運行後，打開瀏覽器進入到以下網址
```
http://localhost:3000/
```

若欲暫停使用
### `ctrl + c`

## 開發者

前端：sigox

後端：YD1234564789

## 開發工具

前端：
- HTML
- CSS
- Javascript
- react 18.2.0
- react-router-dom 6.22.1
- react-google-maps/api 2.19.3
- Bootstrap 5.3.3
- googlemaps/react-wrapper 1.1.35

後端：
- express 4.18.2
- express-session
- jsonwebtoken
- mongoose
- passport
- bcryptjs
