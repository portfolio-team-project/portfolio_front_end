import { Fragment, useState } from "react";
import ContactModal from "./ContactModal";
import PolicyModal from "./PolicyModal";

type PolicyType = "terms" | "privacy" | null;

const CONTACTS = {
  ca: { name: "JI SANGWON", theme: "ca" as const },
  cb: { name: "LEE EUIGWANG", theme: "cb" as const },
};

function Footer() {
  const [modal, setModal] = useState<typeof CONTACTS[keyof typeof CONTACTS] | null>(null);
  const [policy, setPolicy] = useState<PolicyType>(null);

  return (
    <Fragment>
      <section id="contact">
        <p className="ct-label">LET'S CONNECT</p>
        <div className="ct-grid">
          <div className="ct-card ca">
            <p className="ct-name">JI <br/>SANGWON</p>
            <div className="ct-links">
              <span className="ct-lnk">✉ jisang034@naver.com</span>
              <a href="https://github.com/SangWon-Ji" className="ct-lnk" target="_blank" rel="noreferrer">⌥ github.com/SangWon-Ji</a>
            </div>
            <div className="ct-btn-wrap">
              <button className="ct-btn ca" onClick={() => setModal(CONTACTS.ca)}>Contact</button>
            </div>
          </div>
          <div className="ct-card cb">
            <p className="ct-name">LEE <br/>EUIGWANG</p>
            <div className="ct-links">
              <span className="ct-lnk">✉ pshowx12@naver.com</span>
              <a href="https://github.com/EG-L" className="ct-lnk" target="_blank" rel="noreferrer">⌥ github.com/EG-L</a>
            </div>
            <div className="ct-btn-wrap">
              <button className="ct-btn cb" onClick={() => setModal(CONTACTS.cb)}>Contact</button>
            </div>
          </div>
        </div>
        <p className="footer">© 2026 JI SANGWON × LEE EUIGWANG</p>
        <div className="footer-policy">
          <button className="footer-policy-btn" onClick={() => setPolicy("terms")}>이용약관</button>
          <span className="footer-policy-divider">|</span>
          <button className="footer-policy-btn" onClick={() => setPolicy("privacy")}>개인정보처리방침</button>
        </div>
      </section>

      <ContactModal target={modal} onClose={() => setModal(null)} />
      <PolicyModal type={policy} onClose={() => setPolicy(null)} />
    </Fragment>
  );
}

export default Footer;
