import { Fragment, useState } from "react";

const projects = [
    { id: 1, name: "○○시청 테스트베드 실증 지원사업", desc: ["내부망 개발 환경 구축","오류 코드 수정"], tags: ["Docker", "llamacpp", "FastApi", "Postgre", "opensearch"], period: "2025-09.15 ~ 현재" },
    { id: 2, name: "○○시청 민원분석시스템 운영 및 유지관리", desc: ["민원분석시스템 유지관리","파이썬을 이용한 키워드 추출 및 wordcloud 구현","highchart를 이용한 통계 화면 구축","운영계/개발계 SSL 적용","보고서 게시판 화면 재구축","공지사항 재구축","민원 관련 데이터 후처리 작업 적용","개발서버 테이블 통이관 작업","Apache tomcat 9.0.48을 이용한 외부개발용 WAS 구축","개발 llama 서버용 중계 미들웨어 서비스 구축","Jenkins 기반 CI/CD 파이프라인 구축 및 Docker 컨테이너를 활용한 개발 WAS 서버 자동 배포 환경 구현"], tags: ["JAVA", "JSP", "HTML", "CSS", "JAVASCRIPT", "jQuery", "Spring", "Oracle", "Apache-Tomcat 9", "Python", "GitLab", "FastAPI"], period: "2025.01.01 ~ 현재" },
    { id: 3, name: "□□ □□ 진흥원 통합 VOC시스템 구축", desc: ["고유식별정보 암호화 구현", "임시비밀번호 메일 송신 구현", "비밀번호 검증 로직 구현"], tags: ["JAVA", "JSP", "HTML", "CSS", "JAVASCRIPT", "jQuery", "Petra", "Spring", "Oracle", "Jeus8"], period: "2024.10.30 ~ 2024.12.31" },
    { id: 4, name: "☆☆ ☆☆ 위원회 AI기반 통합콜센터 서비스 구축 2차 사업 VOP 이관", desc: ["회원가입 페이지 구현", "로드킬 관련 RESTAPI 구현", "포스트그레 마이그레이션 작업"], tags: ["JAVA", "JSP", "HTML", "CSS", "JAVASCRIPT", "jQuery", "D`Amo", "Spring", "Postgre", "Tomcat", "Jenkins"], period: "2024.06.27 ~ 2024.10.30" },
    { id: 5, name: "해양재난 대응을 위한 3차원 해수유동(조류,해류)관측기술 개발", desc: ["MQTT 통신을 이용한 센서 데이터 송수신 GUI 구축", "유속 데이터 벡터장 구현", "라즈베리파이를 이용한 TX/RX 구현"], tags: ["python", "rabbitMqtt", "PyQt", "numpy", "opencv", "pyqtgraph"], period: "2021.08.09 ~ 2023.06.16" },
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
                    <p className="sub-title">진행 프로젝트</p>
                    <ul className="proj-accordion">
                    {projects.map((proj, idx) => (
                        <li key={proj.id} className={`proj-acc-item b-theme ${openId === proj.id ? "open" : ""}`}>
                        <div className="proj-acc-header" onClick={() => setOpenId(openId === proj.id ? null : proj.id)}>
                            <div className="proj-acc-left">
                            <span className="proj-acc-num">0{idx + 1}</span>
                            <span className="proj-acc-name">{proj.name}</span>
                            </div>
                            <div className="proj-acc-right">
                            <span className="proj-acc-arrow">{openId === proj.id ? "▲" : "▼"}</span>
                            </div>
                        </div>
                        {openId === proj.id && (
                            <div className="proj-acc-body" style={{ textAlign: "left" }}>
                                <span className="proj-period">{proj.period}</span>
                                <ul className="proj-desc-list">
                                    {Array.isArray(proj.desc)
                                        ? (proj.desc as string[]).map((line, i) => (
                                            <li key={i}>• {line}</li>
                                          ))
                                        : <li>{proj.desc}</li>}
                                </ul>
                                <div className="proj-tags">
                                    {proj.tags.map((tag) => <span key={tag} className="proj-tag">{tag}</span>)}
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