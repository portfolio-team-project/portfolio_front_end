import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import githubIcon from '../../../assets/github.svg';
import leeImage from '../../../assets/profile/leeImage.png';
import sangwon from '../../../assets/image/sangwon2.jpg';

function  EntryPage() {
    const navigate = useNavigate();

    return (
        <Fragment>
            <div id="entry">
            <div className="panel panel-a" onClick={() => navigate('/sangwon')}>
                <div className="panel-grid"></div>
                <div className="panel-content">
                <div className="avatar-ring">
                    <img src={sangwon} alt="SANGWON" className="avatar-inner" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                </div>
                <div className="panel-text">
                    <p className="panel-number">01 · FULLSTACK</p>
                    <h2 className="panel-name" style={{ fontSize: '2.4rem' }}>JI<br />SANGWON</h2>
                    <p className="panel-role">FULLSTACK ENGINEER</p>
                    <div className="panel-tags">
                    <span className="ptag">React</span>
                    <span className="ptag">Spring Boot</span>
                    <span className="ptag">PostgreSQL</span>
                    <span className="ptag">Ubuntu</span>
                    

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
                    <img src={leeImage} alt="LEE EUIGWANG" className="avatar-inner" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
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
            <div className="github-links">
                <a href="https://github.com/portfolio-team-project/portfolio_back_end/tree/crops_project" target="_blank" rel="noopener noreferrer">
                    <img src={githubIcon} alt="GitHub" width={20} height={20} />
                    Backend
                </a>
                <a href="https://github.com/portfolio-team-project/portfolio_front_end/tree/cropsProject" target="_blank" rel="noopener noreferrer">
                    <img src={githubIcon} alt="GitHub" width={20} height={20} />
                    Frontend
                </a>
            </div>
        </Fragment>
    );
}

export default EntryPage;