import { Fragment } from "react";
import image1 from '../../../assets/image/unnamed.png';
import image2 from '../../../assets/image/18555243.png';
import image3 from '../../../assets/image/images.png';



function  SangwonPage() {
    return (
        <Fragment>
            <section id="dev-a" className="a-theme">
                <div className="sec-wrap">
                <div className="sec-banner">
                    <div className="sec-banner-left">
                    <p className="sec-idx">FULL STACK ENGINEER</p>
                    <h2 className="sec-name">JI<br /><em>SANGWON</em></h2>
                    </div>
                    <div className="sec-banner-right">
                    <p className="sec-role">Backend · Frontend</p>
                    
                    <p className="sec-bio">빠르게 발전하는 기술에 맞춰 도전하고, 프로젝트를 통해 직접 검증하며 성장하는 개발자입니다.</p>
                    </div>
                </div>

                <div className="skills-wrap">
                    <p className="sub-title">기술 스택</p>
                    <div className="skill-row">
                    <span className="sk">JavaScript</span><span className="sk">React</span><span className="sk">Vue.js</span><span className="sk">CSS</span><span className="sk">HTML</span>
                    </div>
                    <div className="skill-row">
                    <span className="sk">Spring Boot</span><span className="sk">FastAPI</span><span className="sk">Jenkins</span><span className="sk">SVN</span><span className="sk">AWS</span>
                    </div>
                    <div className="skill-row">
                    <span className="sk">Oracle</span><span className="sk">Tibero</span><span className="sk">PostgreSQL</span><span className="sk">MongoDB</span><span className="sk">MySQL</span>
                    </div>
                </div>

                <div className="proj-wrap">
                    <p className="sub-title">진행 프로젝트</p>
                    <div className="proj-grid">
                    <div className="proj-card a-theme">
                        <div className="proj-thumb">

                        <img
                                src={image2}
                                alt="문화정보 데이터 플랫폼 유지보수"
                                className="proj-img"
                            />
                        </div>
                        <div className="proj-body">
                        <h4 className="proj-name">문화정보 데이터 플랫폼 유지보수</h4>
                        <p className="proj-desc">문화데이터 플랫폼 유지보수 및 기능 개선</p>
                        <div className="proj-tags">
                            <span className="proj-tag">Spring</span>
                            <span className="proj-tag">Oracle</span>
                            <span className="proj-tag">Tibero</span>
                            <span className="proj-tag">MongoDB</span>
                            <span className="proj-tag">SVN</span>
                            <span className="proj-tag">Jenkins</span>                       
                        </div>
                        </div>
                    </div>
                    <div className="proj-card a-theme">
                            <div className="proj-thumb">
                        <img
                                src={image1}
                                alt="실감형 데이터 플랫폼 신규 구축"
                                className="proj-img2"
                            />

                        </div>
                        <div className="proj-body">
                        <h4 className="proj-name">실감형 데이터 플랫폼 신규 구축</h4>
                        <p className="proj-desc">서비스 설계 및 Backend · Frontend 개발</p>
                        
                        <div className="proj-tags">
                            <span className="proj-tag">Spring Boot</span>
                            <span className="proj-tag">JavaScript</span>
                            <span className="proj-tag">PostgreSQL</span>
                            <span className="proj-tag">chart.js</span>
                            <span className="proj-tag">Jenkins</span>       
                        </div>
                        </div>
                    </div>
                    <div className="proj-card a-theme">
                        <div className="proj-thumb">

                        <img
                            src={image3}
                            alt="증권 CRM 신규 구축"
                            className="proj-img3"
                        />

                        </div>
                        <div className="proj-body">
                        <h4 className="proj-name">○○증권 CRM 신규 구축</h4>
                        <p className="proj-desc">Frontend 개발 · 화면 구현</p>
                        <div className="proj-tags">
                            <span className="proj-tag">Vue.js</span>
                            <span className="proj-tag">Oracle</span>
                            <span className="proj-tag">FastAPI</span>
                            <span className="proj-tag">chart.js</span>
                            <span className="proj-tag">Git</span>                       
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="tl-wrap">
                    <p className="sub-title">경력 / 학력</p>
                    <div className="tl">
                    <div className="tl-item"><div className="tl-dot"></div><p className="tl-date">2023.02 — 현재</p><p className="tl-ttl">연승 E&C</p><p className="tl-sub">철도 및 도로 설계</p></div>
                    <div className="tl-item"><div className="tl-dot"></div><p className="tl-date">2025.02 — 2026.01</p><p className="tl-ttl">스카이라인 루지 부산</p><p className="tl-sub">손님 응대 및 사이트 관리</p></div>
                    <div className="tl-item"><div className="tl-dot"></div><p className="tl-date">2022.09 — 2024.10</p><p className="tl-ttl">써티웨어</p><p className="tl-sub">웹 신규구축 및 유지보수</p></div>
                    <div className="tl-item"><div className="tl-dot"></div><p className="tl-date">2021.07</p><p className="tl-ttl">LG 이노텍</p><p className="tl-sub">부품 생산 및 생산라인 관리(사원)</p></div>
                    <div className="tl-item"><div className="tl-dot"></div><p className="tl-date">2016.06 — 2016.12</p><p className="tl-ttl">기아AutoLand</p><p className="tl-sub">차량조립 및 도장라인 운영(인턴)</p></div>
                    <div className="tl-item"><div className="tl-dot"></div><p className="tl-date">2016 — 2021</p><p className="tl-ttl">한국 폴리텍 대학교  메카트로닉스과</p><p className="tl-sub">학점 4.02 / 4.5 · 융합프로젝트 작품(동상) / 2020년 대학생 온라인 재능기부</p></div>
                    </div>
                </div>


                <div className="tl-wrap">
                    <p className="sub-title">자격증</p>
                    <div className="tl">
                    <div className="tl-item"><div className="tl-dot"></div><p className="tl-date">2025.12</p><p className="tl-ttl">지게차 기능사 필기 합격(실기 예정)</p></div>
                    <div className="tl-item"><div className="tl-dot"></div><p className="tl-date">2025.05</p><p className="tl-ttl">정보처리기사 필기 합격(실기 예정)</p></div>
                    <div className="tl-item"><div className="tl-dot"></div><p className="tl-date">2016.03</p><p className="tl-ttl">운전면허</p></div>
                    
                   
                    </div>
                </div>

                </div>
            </section>
        </Fragment>
    );
}

export default SangwonPage;