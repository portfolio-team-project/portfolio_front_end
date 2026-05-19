import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  
  return (
    <Fragment> 
        <nav id="nav" className="visible">
            <span className="nav-logo" onClick={() => navigate('/')}>← LEE × JI</span>
            <ul className="nav-links">
                <li><Link to="/sangwon" className="lnk-a" onClick={() => window.scrollTo(0, 0)}>SANGWON</Link></li>
                <li><Link to="/euigwang" className="lnk-b" onClick={() => window.scrollTo(0, 0)}>EUIGWANG</Link></li>
                <li><Link to="/qna" className="qna" onClick={() => window.scrollTo(0,0)}>Q&A</Link></li>
                <li><a href="#contact" className="lnk-c">CONTACT</a></li>
            </ul>
        </nav>
    </Fragment>
  );
}

export default Header;