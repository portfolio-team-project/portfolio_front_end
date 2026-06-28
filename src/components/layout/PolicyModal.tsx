type PolicyType = "terms" | "privacy" | null;

interface Props {
  type: PolicyType;
  onClose: () => void;
}

function PolicyModal({ type, onClose }: Props) {
  if (!type) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="policy-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {type === "terms" && (
          <>
            <p className="policy-modal-title">이용약관</p>
            <div className="policy-modal-body">
              <p>제1조 (목적) 이 약관은 JI SANGWON × LEE EUIGWANG 포트폴리오 팀(이하 "운영팀")이 운영하는 개발자 포트폴리오 서비스(이하 "서비스")의 이용 조건 및 절차, 운영팀과 이용자 간의 권리·의무 및 책임 사항을 규정함을 목적으로 합니다.</p>
              <p>제2조 (정의) "서비스"란 운영팀이 제공하는 개발자 포트폴리오 웹사이트 및 관련 기능 일체를 의미합니다. "회원"이란 본 약관에 동의하고 서비스에 가입한 이용자를 의미합니다.</p>
              <p>제3조 (약관의 효력 및 변경) 이 약관은 서비스 화면에 게시함으로써 효력이 발생합니다. 운영팀은 필요 시 약관을 변경할 수 있으며, 변경 시 사전 공지합니다.</p>
              <p>제4조 (서비스 이용) 회원은 본 약관 및 운영팀의 정책에 따라 서비스를 이용할 수 있습니다. 운영팀은 운영상 필요한 경우 서비스의 전부 또는 일부를 변경하거나 중단할 수 있습니다.</p>
              <p>제5조 (책임 제한) 본 서비스는 비상업적 포트폴리오 목적으로 운영되며, 운영팀은 고의 또는 중과실이 없는 한 서비스 이용으로 발생한 손해에 대해 책임을 지지 않습니다.</p>
              <p>제6조 (준거법) 본 약관은 대한민국 법률에 따라 해석·적용됩니다.</p>
            </div>
          </>
        )}

        {type === "privacy" && (
          <>
            <p className="policy-modal-title">개인정보처리방침</p>
            <div className="policy-modal-body">
              <table className="ac-consent-table" style={{ marginBottom: "12px" }}>
                <thead>
                  <tr>
                    <th>수집 항목</th>
                    <th>수집 목적</th>
                    <th>보유 기간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>아이디, 이름, 이메일, 비밀번호</td>
                    <td>회원 식별 및 서비스 제공</td>
                    <td>탈퇴 후 즉시 삭제</td>
                  </tr>
                  <tr>
                    <td>회사명, 직급, 부서, 담당업무</td>
                    <td>서비스 맞춤화</td>
                    <td>탈퇴 후 즉시 삭제</td>
                  </tr>
                  <tr>
                    <td>접속 IP 주소, 접속 일시</td>
                    <td>서버 운영 및 보안 관리</td>
                    <td>6개월 후 삭제</td>
                  </tr>
                </tbody>
              </table>
              <p>수집된 개인정보는 위 목적 이외의 용도로 사용되지 않습니다. 이용자는 언제든지 개인정보 열람·정정·삭제를 요청하거나 동의를 철회할 수 있습니다.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PolicyModal;
