import { useLocation } from 'react-router-dom';
import logo from '../image/logot.png';
import SearchBar from './SearchBar';

export default function Header() {
  const path = useLocation().pathname
  let content = ""
  let search = ""
  if ( path === "/") {
    content = "登出"
    search= <SearchBar />
  }else{
    content = "註冊"
    search = ""
  }
  return(
    <div id="header">        
        <nav className="navbar d-flex justify-content-between" >    
          <a className="navbar-brand p-0" href="/">
            <img className="d-inline-block" src={logo} alt="" />
            Navigator
          </a>
          {search}
          <a href="/signup" className="btn btn-outline-secondary btn-sm ">{content}</a>
        </nav>     
    </div>
  )
}