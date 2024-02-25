//暫存抓api的程式碼

import './App.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [backendData, setBackendData] = useState([]);

  // 瀏覽前10推薦User
  const getUsers = async () => {
    try {
      const res = await axios.get(`/api`);
      console.log("users.js 裡的 getUsers 回傳值: ", res);
      return res.data;
    } catch (error) {
      console.error("[Get Users failed]: ", error.response.data.message);
    }
  };

  const getUsersAsync = async () => {
    try {
      const users = await getUsers();
      setBackendData(users.users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsersAsync();
  }, [])

  return (
    <div>
      {(typeof backendData === 'undefined') ? (
        <p>Loading...</p>
      ): (
        backendData.map((user, i) => (
          <p key={i}>{user}</p>
        ))
      )}
    </div>
  );
}

export default App;