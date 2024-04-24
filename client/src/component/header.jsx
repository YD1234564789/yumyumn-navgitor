import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../image/logot.png';
import SearchBar from './SearchBar';

export default function Header() {
  const path = useLocation().pathname
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.clear()
    navigate('/login')
  }
  let content = ""
  let search = ""
  if ( path === "/login") {
    content = <button className="btn btn-outline-secondary btn-sm" >註冊</button>
    search = ""
  }else{
    /*
    <SearchBar />
    <button className="btn btn-outline-secondary btn-sm ">{content}</button>
    */
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