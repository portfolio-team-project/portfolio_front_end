import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <Fragment>
      <nav id="nav" className="visible">
        <span className="nav-logo" onClick={() => { navigate('/'); closeMenu(); }}>← LEE × JI</span>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="메뉴"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${menuOpen ? 'mobile-open' : ''}`}>
          <li>
            <Link to="/sangwon" className="lnk-a" onClick={() => { window.scrollTo(0, 0); closeMenu(); }}>
              SANGWON
            </Link>
          </li>
          <li>
            <Link to="/euigwang" className="lnk-b" onClick={() => { window.scrollTo(0, 0); closeMenu(); }}>
              EUIGWANG
            </Link>
          </li>
          <li className="dropdown">
            <span className="dropdown-title">MENU</span>
            <ul className="dropdown-menu">
              <li>
                <Link to="/Login" className="Login" onClick={() => { window.scrollTo(0, 0); closeMenu(); }}>
                  LOGIN
                </Link>
              </li>
              <li>
                <Link to="/qna" className="qna" onClick={() => { window.scrollTo(0, 0); closeMenu(); }}>
                  Q&A
                </Link>
              </li>
              <li>
                <Link to="/BoardList" className="BoardList" onClick={() => { window.scrollTo(0, 0); closeMenu(); }}>
                  게시판
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
}

export default Header;
