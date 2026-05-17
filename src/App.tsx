import { useState } from 'react'
import './App.css'

function App() {
  const [entered, setEntered] = useState(false)

  function enterSite(person: 'a' | 'b') {
    setEntered(true)
    setTimeout(() => {
      const target = document.getElementById('dev-' + person)
      if (target) target.scrollIntoView({ behavior: 'smooth' })
    }, 600)
  }

  function goBack() {
    setEntered(false)
    window.scrollTo({ top: 0 })
  }

  return (
    <>
      <div id="entry" className={entered ? 'hidden' : ''}>
      <div className="panel panel-a" onClick={() => enterSite('a')}>
        <div className="panel-grid"></div>
        <div className="panel-content">
          <div className="avatar-ring">
            <div className="avatar-inner">👨‍💻</div>
          </div>
          <div className="panel-text">
            <p className="panel-number">01 · BACKEND</p>
            <h2 className="panel-name">KIM<br />JUNHO</h2>
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

      {/* Center divider */}
      <div className="entry-divider"></div>
      <div className="entry-center">
        <div className="entry-badge">D×D</div>
        <span className="entry-badge-label">SELECT</span>
      </div>

      {/* Panel B */}
      <div className="panel panel-b" onClick={() => enterSite('b')}>
        <div className="panel-noise"></div>
        <div className="panel-content">
          <div className="avatar-ring">
            <div className="avatar-inner">👩‍💻</div>
          </div>
          <div className="panel-text">
            <p className="panel-number">02 · FRONTEND</p>
            <h2 className="panel-name" style={{ color: 'var(--b-text)' }}>
              LEE<br />SUJI
            </h2>
            <p className="panel-role">Frontend Engineer</p>
            <div className="panel-tags">
              <span className="ptag">React</span>
              <span className="ptag">Next.js</span>
              <span className="ptag">Three.js</span>
              <span className="ptag">Figma</span>
            </div>
            <button className="panel-cta">포트폴리오 보기 →</button>
          </div>
        </div>
      </div>
    </div>

    {/* ════════════════════════
        MAIN CONTENT
    ════════════════════════ */}
    <nav id="nav" className={entered ? 'visible' : ''}>
      <span className="nav-logo" onClick={goBack}>← DEV × DEV</span>
      <ul className="nav-links">
        <li><a href="#dev-a" className="lnk-a">JUNHO</a></li>
        <li><a href="#dev-b" className="lnk-b">SUJI</a></li>
        <li><a href="#contact" className="lnk-c">CONTACT</a></li>
      </ul>
    </nav>

    <div id="main-content" className={entered ? 'visible' : ''}>

      {/* ── DEV A ── */}
      <section id="dev-a" className="a-theme">
        <div className="sec-wrap">
          <div className="sec-banner">
            <div className="sec-banner-left">
              <p className="sec-idx">01 · BACKEND ENGINEER</p>
              <h2 className="sec-name">KIM<br /><em>JUNHO</em></h2>
            </div>
            <div className="sec-banner-right">
              <p className="sec-role">Backend · Infra · System Design</p>
              <p className="sec-bio">안정적이고 확장 가능한 시스템을 설계하는 것을 좋아합니다. 성능 최적화와 클린 코드에 진심입니다.</p>
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

      <div className="strip"></div>

      {/* ── DEV B ── */}
      <section id="dev-b" className="b-theme">
        <div className="sec-wrap">
          <div className="sec-banner">
            <div className="sec-banner-left">
              <p className="sec-idx">02 · FRONTEND ENGINEER</p>
              <h2 className="sec-name">LEE<br /><em>SUJI</em></h2>
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

      <div className="strip"></div>

      {/* CONTACT */}
      <section id="contact">
        <p className="ct-label">LET'S CONNECT</p>
        <h2 className="ct-title">함께 <em>만들어요.</em></h2>
        <div className="ct-grid">
          <div className="ct-card ca">
            <p className="ct-name">KIM JUNHO</p>
            <a href="#" className="ct-lnk">✉ junho@email.com</a>
            <a href="#" className="ct-lnk">⌥ github.com/junho</a>
            <a href="#" className="ct-lnk">in linkedin.com/in/junho</a>
          </div>
          <div className="ct-card cb">
            <p className="ct-name">LEE SUJI</p>
            <a href="#" className="ct-lnk">✉ suji@email.com</a>
            <a href="#" className="ct-lnk">⌥ github.com/suji</a>
            <a href="#" className="ct-lnk">in linkedin.com/in/suji</a>
          </div>
        </div>
        <p className="footer">© 2026 KIM JUNHO × LEE SUJI</p>
      </section>

    </div>
    </>
  )
}

export default App
