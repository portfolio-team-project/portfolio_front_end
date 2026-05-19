import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

function  EntryPage() {
    const navigate = useNavigate();

    return (
        <Fragment>
            <div id="entry">
            <div className="panel panel-a" onClick={() => navigate('/sangwon')}>
                <div className="panel-grid"></div>
                <div className="panel-content">
                <div className="avatar-ring">
                    <div className="avatar-inner">👨‍💻</div>
                </div>
                <div className="panel-text">
                    <p className="panel-number">01 · BACKEND</p>
                    <h2 className="panel-name" style={{ fontSize: '2.4rem' }}>JI<br />SANGWON</h2>
                    <p className="panel-role">Backend Engineer</p>
                    <div className="panel-tags">
                    <span className="ptag">Python</span>
                    <span className="ptag">Spring</span>
                    <span className="ptag">Docker</span>
                    <span className="ptag">AWS</span>
                    </div>
                    <button className="panel-cta">포트폴리오 보기 →</button>
                </div>
                </div>
            </div>

            {/* Panel B */}
            <div className="panel panel-b" onClick={() => navigate('/euigwang')}>
                <div className="panel-noise"></div>
                <div className="panel-content">
                <div className="avatar-ring">
                    <div className="avatar-inner">👩‍💻</div>
                </div>
                <div className="panel-text">
                    <p className="panel-number">02 · Fullstack</p>
                    <h2 className="panel-name" style={{ color: 'var(--b-text)', fontSize: '2.4rem' }}>
                    LEE<br />EUIGWANG
                    </h2>
                    <p className="panel-role">Fullstack Engineer</p>
                    <div className="panel-tags">
                    <span className="ptag">Spring Boot</span>
                    <span className="ptag">Python</span>
                    <span className="ptag">Docker</span>
                    <span className="ptag">Jenkins</span>
                    <span className="ptag">React</span>
                    </div>
                    <button className="panel-cta">포트폴리오 보기 →</button>
                </div>
                </div>
            </div>
            </div>
        </Fragment>
    );
}

export default EntryPage;