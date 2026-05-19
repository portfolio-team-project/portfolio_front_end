import { Fragment, useState } from "react";

const projects = [
    { id: 1, badge: "WEB", name: "브랜드 랜딩페이지", desc: "스크롤 기반 인터랙티브 스토리텔링. GSAP 애니메이션 활용.", tags: ["React", "GSAP", "Three.js"], links: [{ label: "⌥ GitHub", href: "#" }, { label: "↗ Demo", href: "#" }] },
    { id: 2, badge: "APP", name: "커뮤니티 앱 리디자인", desc: "기존 앱 UX 전면 개선. 사용자 체류시간 2배 향상.", tags: ["Next.js", "Figma", "Tailwind"], links: [{ label: "⌥ GitHub", href: "#" }, { label: "↗ Demo", href: "#" }] },
    { id: 3, badge: "E-COMM", name: "이커머스 UI 고도화", desc: "전환율 중심 쇼핑 UI. A/B 테스트로 구매율 23% 개선.", tags: ["Vue", "Pinia", "CSS"], links: [{ label: "⌥ GitHub", href: "#" }] },
];

function EuigwangPage() {
    const [openId, setOpenId] = useState<number | null>(null);
    return (
        <Fragment>
            <section id="dev-b" className="b-theme">
                <div className="sec-wrap">
                <div className="sec-banner">
                    <div className="sec-banner-left">
                    <p className="sec-idx">02 · Fullstack ENGINEER</p>
                    <h2 className="sec-name">LEE<br /><em>EUIGWANG</em></h2>
                    </div>
                    <div className="sec-banner-right">
                    <p className="sec-role">Backend · Infra · System Design</p>
                    <p className="sec-bio">사용자 경험을 최우선으로 생각하는 풀스택 개발자입니다. 안정적이고 확장 가능한 시스템 설계를 추구합니다.</p>
                    </div>
                </div>

                <div className="skills-wrap">
                    <p className="sub-title">기술 스택</p>
                    <div className="skill-row">
                        <span className="sk">JavaScript</span>
                        <span className="sk">TypeScript</span>
                        <span className="sk">HTML/CSS</span>
                    </div>
                    <div className="skill-row">
                        <span className="sk">React</span>
                        <span className="sk">Spring Boot</span>
                        <span className="sk">Python</span>
                        <span className="sk">AWS</span>
                        <span className="sk">Jenkins</span>
                    </div>
                    <div className="skill-row">
                        <span className="sk">Redis</span>
                        <span className="sk">Docker</span>
                    </div>
                </div>

                <div className="proj-wrap">
                    <p className="sub-title">프로젝트</p>
                    <ul className="proj-accordion">
                    {projects.map((proj, idx) => (
                        <li key={proj.id} className={`proj-acc-item b-theme ${openId === proj.id ? "open" : ""}`}>
                        <div className="proj-acc-header" onClick={() => setOpenId(openId === proj.id ? null : proj.id)}>
                            <div className="proj-acc-left">
                            <span className="proj-acc-num">0{idx + 1}</span>
                            <span className="proj-acc-name">{proj.name}</span>
                            </div>
                            <div className="proj-acc-right">
                            <span className="proj-badge">{proj.badge}</span>
                            <span className="proj-acc-arrow">{openId === proj.id ? "▲" : "▼"}</span>
                            </div>
                        </div>
                        {openId === proj.id && (
                            <div className="proj-acc-body">
                            <p className="proj-desc">{proj.desc}</p>
                            <div className="proj-tags">
                                {proj.tags.map((tag) => <span key={tag} className="proj-tag">{tag}</span>)}
                            </div>
                            <div className="proj-links">
                                {proj.links.map((lnk) => <a key={lnk.label} href={lnk.href} className="proj-link">{lnk.label}</a>)}
                            </div>
                            </div>
                        )}
                        </li>
                    ))}
                    </ul>
                </div>

                <div className="tl-wrap">
                    <p className="sub-title">경력 / 학력</p>
                    <div className="tl">
                        <div className="tl-item">
                            <div className="tl-dot"/>
                            <p className="tl-date">2022.09 — 현재</p>
                            <p className="tl-ttl">□□ 에이전시 · 프론트엔드 개발자</p>
                            <p className="tl-sub">20+ 클라이언트 웹사이트 개발 리드</p>
                        </div>
                        <div className="tl-item">
                            <div className="tl-dot"/>
                            <p className="tl-date">2022.01 — 2022.08</p>
                            <p className="tl-ttl">◇◇ 스타트업 · UI 개발 인턴</p>
                            <p className="tl-sub">디자인 시스템 구축, Storybook 도입</p>
                        </div>
                        <div className="tl-item">
                            <div className="tl-dot"/>
                            <p className="tl-date">2018 — 2022</p>
                            <p className="tl-ttl">○○대학교 소프트웨어학부</p>
                            <p className="tl-sub">HCI 트랙 · 캡스톤 프로젝트 최우수상</p>
                        </div>
                    </div>
                </div>
                </div>
            </section>
        </Fragment>
    );
}

export default EuigwangPage;