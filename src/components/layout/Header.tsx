import { Fragment, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { logoutAsync } from "../../slices/memberSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.member);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = async () => {
    await dispatch(logoutAsync());
    navigate("/login");
    closeMenu();
    setProfileOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          {user && (
            <li className="mobile-user-info">
              <span className="mobile-user-id">{user.userName}</span>
              <button className="mobile-logout-btn" onClick={() => { navigate("/account"); closeMenu(); }}>계정설정</button>
              <button className="mobile-logout-btn" onClick={handleLogout}>로그아웃</button>
            </li>
          )}
          <li className="dropdown">
            <span className="dropdown-title">MENU</span>
            <ul className="dropdown-menu">
              {!user && (
                <li>
                  <Link to="/Login" className="Login" onClick={() => { window.scrollTo(0, 0); closeMenu(); }}>
                    LOGIN
                  </Link>
                </li>
              )}
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
              {user?.role === import.meta.env.VITE_CHECK_AUTH && (
                <li>
                  <Link to="/admin" className="admin" onClick={() => { window.scrollTo(0, 0); closeMenu(); }}>
                    관리자
                  </Link>
                </li>
              )}
            </ul>
          </li>
        </ul>

        <div className="profile-wrap" ref={profileRef}>
          {user && (
            <>
              <div className="profile-avatar" onClick={() => setProfileOpen(prev => !prev)}>
                {user.userName.charAt(0)}
              </div>
              {profileOpen && (
                <div className="profile-dropdown">
                  <span className="profile-name">{user.userName}</span>
                  <button onClick={() => { navigate("/account"); setProfileOpen(false); }}>계정설정</button>
                  <button onClick={handleLogout}>로그아웃</button>
                </div>
              )}
            </>
          )}
        </div>
      </nav>
    </Fragment>
  );
}

export default Header;
