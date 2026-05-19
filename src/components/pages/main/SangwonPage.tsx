import { Fragment } from "react";

function  SangwonPage() {
    return (
        <Fragment>
            <section id="dev-a" className="a-theme">
                <div className="sec-wrap">
                <div className="sec-banner">
                    <div className="sec-banner-left">
                    <p className="sec-idx">01 · BACKEND ENGINEER</p>
                    <h2 className="sec-name">JI<br /><em>SANGWON</em></h2>
                    </div>
                    <div className="sec-banner-right">
                    <p className="sec-role">Backend · Infra · System Design</p>
                    <p className="sec-bio">안정적이고 확장 가능한 시스템123을 설계하는 것을 좋아합니다. 성능 최적화와 클린 코드에 진심입니다.</p>
                    </div>
                </div>

                <div className="skills-wrap">
                    <p className="sub-title">기술 스택</p>
                    <div className="skill-row">
                    <span className="sk">Python</span><span className="sk">Java</span><span className="sk">TypeScript</span><span className="sk">Go</span>
                    </div>
                    <div className="skill-row">
                    <span className="sk">Spring Boot</span><span className="sk">FastAPI</span><span className="sk">PostgreSQL</span><span className="sk">Redis</span><span className="sk">Kafka</span>
                    </div>
                    <div className="skill-row">
                    <span className="sk">Docker</span><span className="sk">Kubernetes</span><span className="sk">AWS</span><span className="sk">Terraform</span>
                    </div>
                </div>

                <div className="proj-wrap">
                    <p className="sub-title">프로젝트</p>
                    <div className="proj-grid">
                    <div className="proj-card a-theme">
                        <div className="proj-thumb">🗄️<span className="proj-badge">WEB APP</span></div>
                        <div className="proj-body">
                        <h4 className="proj-name">실시간 채팅 플랫폼</h4>
                        <p className="proj-desc">WebSocket 기반 대규모 실시간 채팅. 10만 동시접속 처리.</p>
                        <div className="proj-tags"><span className="proj-tag">Spring</span><span className="proj-tag">Redis</span><span className="proj-tag">WS</span></div>
                        <div className="proj-links"><a href="#" className="proj-link">⌥ GitHub</a><a href="#" className="proj-link">↗ Demo</a></div>
                        </div>
                    </div>
                    <div className="proj-card a-theme">
                        <div className="proj-thumb">🔐<span className="proj-badge">API</span></div>
                        <div className="proj-body">
                        <h4 className="proj-name">통합 인증 서비스</h4>
                        <p className="proj-desc">JWT + OAuth2 기반 멀티테넌트 인증 마이크로서비스.</p>
                        <div className="proj-tags"><span className="proj-tag">FastAPI</span><span className="proj-tag">JWT</span><span className="proj-tag">Docker</span></div>
                        <div className="proj-links"><a href="#" className="proj-link">⌥ GitHub</a><a href="#" className="proj-link">↗ Demo</a></div>
                        </div>
                    </div>
                    <div className="proj-card a-theme">
                        <div className="proj-thumb">📊<span className="proj-badge">DATA</span></div>
                        <div className="proj-body">
                        <h4 className="proj-name">데이터 파이프라인</h4>
                        <p className="proj-desc">Kafka 기반 실시간 데이터 수집·분석 파이프라인 구축.</p>
                        <div className="proj-tags"><span className="proj-tag">Kafka</span><span className="proj-tag">Spark</span><span className="proj-tag">AWS</span></div>
                        <div className="proj-links"><a href="#" className="proj-link">⌥ GitHub</a></div>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="tl-wrap">
                    <p className="sub-title">경력 / 학력</p>
                    <div className="tl">
                    <div className="tl-item"><div className="tl-dot"></div><p className="tl-date">2023.03 — 현재</p><p className="tl-ttl">○○ 스타트업 · 백엔드 개발자</p><p className="tl-sub">결제 시스템 고도화, API 성능 40% 개선</p></div>
                    <div className="tl-item"><div className="tl-dot"></div><p className="tl-date">2022.07 — 2023.02</p><p className="tl-ttl">△△ 테크 · 인턴 개발자</p><p className="tl-sub">내부 관리 툴 개발 및 DB 쿼리 최적화</p></div>
                    <div className="tl-item"><div className="tl-dot"></div><p className="tl-date">2018 — 2022</p><p className="tl-ttl">○○대학교 컴퓨터공학과</p><p className="tl-sub">학점 4.2 / 4.5 · 졸업 논문 우수상</p></div>
                    </div>
                </div>
                </div>
            </section>
        </Fragment>
    );
}

export default SangwonPage;