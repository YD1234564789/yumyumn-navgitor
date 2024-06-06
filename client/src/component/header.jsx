import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from "react";
import logo from '../image/logot.png';
import SearchBar from './Main/SearchBar';
import { AuthContext } from '../api/auth';

export default function Header() {
  const {  setAuth } = useContext( AuthContext )
  const path = useLocation().pathname
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.clear()
    setAuth("")
    if ( path === "/login"){
      navigate('/signup')
    }else{
      navigate('/login')
    }
  }
  let content = ""
  let search = ""
  if ( path === "/login") {
    content = <button className="btn btn-outline-secondary btn-sm" onClick={handleClick} >註冊</button>
    search = ""
  }else if(path === "/signup"){
    content = <button className="btn btn-outline-secondary btn-sm" onClick={handleClick} >返回</button>
    search = ""
  }else{
    content = <button className="btn btn-outline-secondary btn-sm" onClick={handleClick} >登出</button>
    search= <SearchBar />
  }
  return(
    <div id="header">        
        <nav className="navbar d-flex justify-content-between" >    
          <a className="navbar-brand p-0" href="/">
            <img className="d-inline-block" src={logo} alt="" />
            Navigator
          </a>
          {search}
          {content}
        </nav>     
    </div>
  )
}