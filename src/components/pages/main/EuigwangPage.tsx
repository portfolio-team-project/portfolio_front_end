import { Fragment } from "react";

function  EuigwangPage() {
    return (
        <Fragment>
            <section id="dev-b" className="b-theme">
                <div className="sec-wrap">
                <div className="sec-banner">
                    <div className="sec-banner-left">
                    <p className="sec-idx">02 · FRONTEND ENGINEER</p>
                    <h2 className="sec-name">LEE<br /><em>EUIGWANG</em></h2>
                    </div>
                    <div className="sec-banner-right">
                    <p className="sec-role">UI · Interaction · UX Design</p>
                    <p className="sec-bio">사용자 경험을 최우선으로 생각하는 프론트엔드 개발자입니다. 픽셀 단위의 디테일과 부드러운 인터랙션을 추구합니다.</p>
                    </div>
                </div>

                <div className="skills-wrap">
                    <p className="sub-title">기술 스택</p>
                    <div className="skill-row">
                    <span className="sk">JavaScript</span><span className="sk">TypeScript</span><span className="sk">HTML/CSS</span>
                    </div>
                    <div className="skill-row">
                    <span className="sk">React</span><span className="sk">Next.js</span><span className="sk">Vue</span><span className="sk">Tailwind CSS</span><span className="sk">Framer Motion</span>
                    </div>
                    <div className="skill-row">
                    <span className="sk">Three.js</span><span className="sk">GSAP</span><span className="sk">Figma</span><span className="sk">Storybook</span>
                    </div>
                </div>

                <div className="proj-wrap">
                    <p className="sub-title">프로젝트</p>
                    <div className="proj-grid">
                    <div className="proj-card b-theme">
                        <div className="proj-thumb">🌐<span className="proj-badge">WEB</span></div>
                        <div className="proj-body">
                        <h4 className="proj-name">브랜드 랜딩페이지</h4>
                        <p className="proj-desc">스크롤 기반 인터랙티브 스토리텔링. GSAP 애니메이션 활용.</p>
                        <div className="proj-tags"><span className="proj-tag">React</span><span className="proj-tag">GSAP</span><span className="proj-tag">Three.js</span></div>
                        <div className="proj-links"><a href="#" className="proj-link">⌥ GitHub</a><a href="#" className="proj-link">↗ Demo</a></div>
                        </div>
                    </div>
                    <div className="proj-card b-theme">
                        <div className="proj-thumb">📱<span className="proj-badge">APP</span></div>
                        <div className="proj-body">
                        <h4 className="proj-name">커뮤니티 앱 리디자인</h4>
                        <p className="proj-desc">기존 앱 UX 전면 개선. 사용자 체류시간 2배 향상.</p>
                        <div className="proj-tags"><span className="proj-tag">Next.js</span><span className="proj-tag">Figma</span><span className="proj-tag">Tailwind</span></div>
                        <div className="proj-links"><a href="#" className="proj-link">⌥ GitHub</a><a href="#" className="proj-link">↗ Demo</a></div>
                        </div>
                    </div>
                    <div className="proj-card b-theme">
                        <div className="proj-thumb">🛒<span className="proj-badge">E-COMM</span></div>
                        <div className="proj-body">
                        <h4 className="proj-name">이커머스 UI 고도화</h4>
                        <p className="proj-desc">전환율 중심 쇼핑 UI. A/B 테스트로 구매율 23% 개선.</p>
                        <div className="proj-tags"><span className="proj-tag">Vue</span><span className="proj-tag">Pinia</span><span className="proj-tag">CSS</span></div>
                        <div className="proj-links"><a href="#" className="proj-link">⌥ GitHub</a></div>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="tl-wrap">
                    <p className="sub-title">경력 / 학력</p>
                    <div className="tl">
                    <div className="tl-item"><div className="tl-dot"></div><p className="tl-date">2022.09 — 현재</p><p className="tl-ttl">□□ 에이전시 · 프론트엔드 개발자</p><p className="tl-sub">20+ 클라이언트 웹사이트 개발 리드</p></div>
                    <div className="tl-item"><div className="tl-dot"></div><p className="tl-date">2022.01 — 2022.08</p><p className="tl-ttl">◇◇ 스타트업 · UI 개발 인턴</p><p className="tl-sub">디자인 시스템 구축, Storybook 도입</p></div>
                    <div className="tl-item"><div className="tl-dot"></div><p className="tl-date">2018 — 2022</p><p className="tl-ttl">○○대학교 소프트웨어학부</p><p className="tl-sub">HCI 트랙 · 캡스톤 프로젝트 최우수상</p></div>
                    </div>
                </div>
                </div>
            </section>
        </Fragment>
    );
}

export default EuigwangPage;