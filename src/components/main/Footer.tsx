import { Fragment } from "react";

function Footer() {
  return (
    <Fragment>
        <section id="contact">
            <p className="ct-label">LET'S CONNECT</p>
            <div className="ct-grid">
            <div className="ct-card ca">
                <p className="ct-name">JI <br/>SANGWON</p>
                <a href="#" className="ct-lnk">✉ sangwon@email.com</a>
                <a href="#" className="ct-lnk">⌥ github.com/sangwon</a>
                <a href="#" className="ct-lnk">in linkedin.com/in/sangwon</a>
            </div>
            <div className="ct-card cb">
                <p className="ct-name">LEE <br/>EUIGWANG</p>
                <a href="#" className="ct-lnk">✉ pshowx12@naver.com</a>
                <a href="#" className="ct-lnk">⌥ github.com/EG-L</a>
            </div>
            </div>
            <p className="footer">© 2026 JI SANGWON × LEE EUIGWANG</p>
        </section>
    </Fragment>
  );
}

export default Footer;
