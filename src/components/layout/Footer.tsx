import { Fragment, useState } from "react";
import ContactModal from "./ContactModal";

const CONTACTS = {
  ca: { name: "JI SANGWON", theme: "ca" as const },
  cb: { name: "LEE EUIGWANG", theme: "cb" as const },
};

function Footer() {
  const [modal, setModal] = useState<typeof CONTACTS[keyof typeof CONTACTS] | null>(null);

  return (
    <Fragment>
      <section id="contact">
        <p className="ct-label">LET'S CONNECT</p>
        <div className="ct-grid">
          <div className="ct-card ca">
            <p className="ct-name">JI <br/>SANGWON</p>
            <div className="ct-links">
              <a href="#" className="ct-lnk">✉ sangwon@email.com</a>
              <a href="#" className="ct-lnk">⌥ github.com/sangwon</a>
              <a href="#" className="ct-lnk">in linkedin.com/in/sangwon</a>
            </div>
            <div className="ct-btn-wrap">
              <button className="ct-btn ca" onClick={() => setModal(CONTACTS.ca)}>Contact</button>
            </div>
          </div>
          <div className="ct-card cb">
            <p className="ct-name">LEE <br/>EUIGWANG</p>
            <div className="ct-links">
              <a href="#" className="ct-lnk">✉ pshowx12@naver.com</a>
              <a href="https://github.com/EG-L" className="ct-lnk" target="_blank" rel="noreferrer">⌥ github.com/EG-L</a>
            </div>
            <div className="ct-btn-wrap">
              <button className="ct-btn cb" onClick={() => setModal(CONTACTS.cb)}>Contact</button>
            </div>
          </div>
        </div>
        <p className="footer">© 2026 JI SANGWON × LEE EUIGWANG</p>
      </section>

      <ContactModal target={modal} onClose={() => setModal(null)} />
    </Fragment>
  );
}

export default Footer;
