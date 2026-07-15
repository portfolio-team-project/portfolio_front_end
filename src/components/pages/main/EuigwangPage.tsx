import { Fragment, useState } from "react";

const skills = [
    {
        category: "Frontend",
        desc: "컴포넌트 기반 UI 개발 및 반응형 레이아웃 구현",
        tags: ["JavaScript", "TypeScript", "React", "HTML", "CSS"],
    },
    {
        category: "Backend · Infra",
        desc: "REST API 설계, CI/CD 파이프라인 구축, 컨테이너 환경 운영",
        tags: ["Spring Boot", "Python", "FastAPI", "Docker", "Jenkins", "AWS"],
    },
    {
        category: "Database",
        desc: "관계형·비관계형 DB 설계 및 대용량 데이터 처리",
        tags: ["Oracle", "PostgreSQL", "Redis", "OpenSearch"],
    },
];

const projects = [
    {
        id: 1,
        name: "○○시청 테스트베드 실증 지원사업",
        desc: ["내부망 개발 환경 구축", "오류 코드 수정"],
        tags: ["Docker", "llamacpp", "FastApi", "Postgre", "opensearch"],
        period: "2025-09.15 ~ 현재",
    },
    {
        id: 2,
        name: "○○시청 민원분석시스템 운영 및 유지관리",
        desc: [
            "민원분석시스템 유지관리",
            "파이썬을 이용한 키워드 추출 및 wordcloud 구현",
            "highchart를 이용한 통계 화면 구축",
            "운영계/개발계 SSL 적용",
            "보고서 게시판 화면 재구축",
            "공지사항 재구축",
            "민원 관련 데이터 후처리 작업 적용",
            "개발서버 테이블 통이관 작업",
            "Apache tomcat 9.0.48을 이용한 외부개발용 WAS 구축",
            "개발 llama 서버용 중계 미들웨어 서비스 구축",
            "Jenkins 기반 CI/CD 파이프라인 구축 및 Docker 컨테이너를 활용한 개발 WAS 서버 자동 배포 환경 구현",
        ],
        tags: ["JAVA", "JSP", "HTML", "CSS", "JAVASCRIPT", "jQuery", "Spring", "Oracle", "Apache-Tomcat 9", "Python", "GitLab", "FastAPI"],
        period: "2025.01.01 ~ 현재",
    },
    {
        id: 3,
        name: "□□ □□ 진흥원 통합 VOC시스템 구축",
        desc: ["고유식별정보 암호화 구현", "임시비밀번호 메일 송신 구현", "비밀번호 검증 로직 구현"],
        tags: ["JAVA", "JSP", "HTML", "CSS", "JAVASCRIPT", "jQuery", "Petra", "Spring", "Oracle", "Jeus8"],
        period: "2024.10.30 ~ 2024.12.31",
    },
    {
        id: 4,
        name: "☆☆ ☆☆ 위원회 AI기반 통합콜센터 서비스 구축 2차 사업 VOP 이관",
        desc: ["회원가입 페이지 구현", "로드킬 관련 RESTAPI 구현", "포스트그레 마이그레이션 작업"],
        tags: ["JAVA", "JSP", "HTML", "CSS", "JAVASCRIPT", "jQuery", "D`Amo", "Spring", "Postgre", "Tomcat", "Jenkins"],
        period: "2024.06.27 ~ 2024.10.30",
    },
    {
        id: 5,
        name: "해양재난 대응 관측 시스템 개발",
        desc: ["MQTT 통신을 이용한 센서 데이터 송수신 GUI 구축", "유속 데이터 벡터장 구현", "라즈베리파이를 이용한 TX/RX 구현"],
        tags: ["python", "rabbitMqtt", "PyQt", "numpy", "opencv", "pyqtgraph"],
        period: "2021.08.09 ~ 2023.06.16",
    },
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
                        </div>
                    </div>

                    <div className="b-quote-wrap">
                        <span className="b-quote-bg">"</span>
                        <p className="b-quote-text">
                            서비스가 멈추지 않도록,<br />설계부터 운영까지 책임집니다.
                        </p>
                        <p className="b-quote-sub">안정성과 확장성을 함께 고려하는 시스템을 만듭니다</p>
                    </div>

                    <div className="skills-wrap">
                        <p className="sub-title">기술 스택</p>
                        <div className="b-skill-grid">
                            {skills.map((s) => (
                                <div key={s.category} className="b-skill-row">
                                    <span className="b-skill-cat-label">{s.category}</span>
                                    <div className="b-skill-cat-right">
                                        <div className="b-skill-tags">
                                            {s.tags.map((tag) => (
                                                <span key={tag} className="sk">{tag}</span>
                                            ))}
                                        </div>
                                        <p className="b-skill-cat-desc">{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="github-stats-wrap">
                        <p className="sub-title">GitHub</p>
                        <img
                            src="https://ghchart.rshah.org/219138/EG-L"
                            alt="EG-L GitHub 기여도"
                            className="github-chart-img"
                        />
                        <div className="github-lang-grid">
                            <img
                                src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=EG-L&theme=transparent"
                                alt="레포지토리별 언어"
                                className="github-lang-img"
                            />
                            <img
                                src="https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=EG-L&theme=transparent"
                                alt="커밋별 언어"
                                className="github-lang-img"
                            />
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
                                            <span className="proj-acc-period">{proj.period}</span>
                                        </div>
                                        <div className="proj-acc-right">
                                            <span className="proj-acc-arrow">{openId === proj.id ? "▲" : "▼"}</span>
                                        </div>
                                    </div>
                                    {openId === proj.id && (
                                        <div className="proj-acc-body" style={{ textAlign: "left" }}>
                                            <ul className="proj-desc-list">
                                                {(proj.desc as string[]).map((line, i) => (
                                                    <li key={i}>• {line}</li>
                                                ))}
                                            </ul>
                                            <div className="proj-tags">
                                                {proj.tags.map((tag) => (
                                                    <span key={tag} className="proj-tag">{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="tl-wrap">
                        <p className="sub-title">자격증</p>
                        <div className="tl">
                            <div className="tl-item">
                                <div className="tl-dot" />
                                <p className="tl-date">2024.07</p>
                                <p className="tl-ttl">빅데이터분석기사</p>
                                <p className="tl-sub">한국데이터산업진흥원</p>
                            </div>
                            <div className="tl-item">
                                <div className="tl-dot" />
                                <p className="tl-date">2023.10</p>
                                <p className="tl-ttl">SQL 개발자</p>
                                <p className="tl-sub">한국데이터산업진흥원</p>
                            </div>
                            <div className="tl-item">
                                <div className="tl-dot" />
                                <p className="tl-date">2023.06</p>
                                <p className="tl-ttl">정보처리기사</p>
                                <p className="tl-sub">한국산업인력공단</p>
                            </div>
                            <div className="tl-item">
                                <div className="tl-dot" />
                                <p className="tl-date">2023.03</p>
                                <p className="tl-ttl">데이터분석 준전문가</p>
                                <p className="tl-sub">한국데이터산업진흥원</p>
                            </div>
                            <div className="tl-item">
                                <div className="tl-dot" />
                                <p className="tl-date">2022.05</p>
                                <p className="tl-ttl">정보통신산업기사</p>
                                <p className="tl-sub">한국방송통신전파진흥원</p>
                            </div>
                            <div className="tl-item">
                                <div className="tl-dot" />
                                <p className="tl-date">2021.06</p>
                                <p className="tl-ttl">정보처리산업기사</p>
                                <p className="tl-sub">한국산업인력공단</p>
                            </div>
                        </div>
                    </div>

                    <div className="tl-wrap">
                        <p className="sub-title">경력 / 학력</p>
                        <div className="tl">
                            <div className="tl-item">
                                <div className="tl-dot" />
                                <p className="tl-date">2024.05 — 현재</p>
                                <p className="tl-ttl">SRPOST · 웹 개발자</p>
                            </div>
                            <div className="tl-item">
                                <div className="tl-dot" />
                                <p className="tl-date">2021.08 — 2023.06</p>
                                <p className="tl-ttl">경원산업 · 연구원</p>
                            </div>
                            <div className="tl-item">
                                <div className="tl-dot" />
                                <p className="tl-date">2019.02 — 2021.02</p>
                                <p className="tl-ttl">한국 폴리텍 대학교 인천캠퍼스 메카트로닉스과 졸업</p>
                            </div>
                            <div className="tl-item">
                                <div className="tl-dot" />
                                <p className="tl-date">2013.02 — 2018.12</p>
                                <p className="tl-ttl">대전대학교 경제학과 중퇴</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}

export default EuigwangPage;
