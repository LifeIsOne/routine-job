import React, { useState } from "react";

const SingUp = () => {
  // const [username, setUsername] = useState("");
  const [prepStatus, setPrepStatus] = useState(true); // 아코디언 상태

  const prepOptions = [
    { id: "cert", label: "자격증 준비중" },
    { id: "resume", label: "이력서/포트폴리오 작성 중" },
    { id: "coding", label: "코딩 테스트 준비 중" },
    { id: "ncs", label: "인적성 검사 준비중 (NCS 등)" },
    { id: "waiting", label: "채용 지원 후 대기중" },
    { id: "interview", label: "면접 준비 중" },
    { id: "project", label: "사이드 프로젝트 진행 중" },
    { id: "change", label: "이직 준비중" },
  ];

  const difficulties = [
    { id: "exp", label: "경험/스펙 부족" },
    { id: "info", label: "채용 정보 부족" },
    { id: "skill", label: "실무 역량 부족" },
    { id: "competition", label: "높은 경쟁률" },
    { id: "salary", label: "희망 급여와의 차이" },
    { id: "location", label: "원하는 근무지역의 제한" },
    { id: "direction", label: "진로 방향성 고민" },
  ];

  return (
    // <div className="login-container">
    //   <div>SingUp</div>
    //   <input
    //     type="text"
    //     placeholder="이름을 입력하세요"
    //     value={username}
    //     onClick={(e) => setUsername(e.target.value)}
    //   />
    // </div>

    // 폼 컨테이나
    <div className="form-container">
      {/* 이름 폼*/}
      <div className="form-group">
        <label className="form-label">이름</label>
        <input
          type="text"
          className="form-input"
          placeholder="이름을 입력하세요"
        />
      </div>

      {/* 생년월일 폼 */}
      <div className="form-group">
        <label className="form-label">생년월일</label>
        <input type="date" className="form-input" />
      </div>

      {/* 최종락력 폼 */}
      <div className="form-group">
        <label className="form-label">최종학력</label>
        <select className="form-select">
          <option value="">선택하세요</option>
          <option value="">고등학교 졸업</option>
          <option value="">대학 졸업 예정</option>
          <option value="">대학 졸업</option>
          <option value="">대학원 졸업 예정</option>
          <option value="">대학원 졸업</option>
          <option value="">박사</option>
        </select>
      </div>

      {/* 희망 기업 유형 */}
      <div className="form-group">
        <label className="form-label">희망 기업 유형</label>
        <select className="form-select">
          <option value="">선택하세요</option>
          <option value="">스타트업</option>
          <option value="">중소기업</option>
          <option value="">중견기업</option>
          <option value="">대기업</option>
          <option value="">공기업</option>
        </select>
      </div>

      {/* 희망 직무 폼 */}
      <div className="form-group">
        <label className="form-label">희망 직무</label>
        <select className="form-select">
          <option value="">선택하세요</option>
          <option value="">백엔드</option>
          <option value="">프론트엔드</option>
          <option value="">풀스택</option>
          <option value="">디자인/마케팅</option>
          <option value="">영업</option>
          <option value="">경영지원</option>
        </select>
      </div>

      {/* 총 취업 준비 기간 폼 */}
      <div className="form-group">
        <label className="form-label">총 취업 준비 기간</label>
        <div className="duration-container">
          <select className="form-select duration-select">
            <option value="">년</option>
            {[0, 1, 2, 3, 4, 5].map((year) => (
              <option key={year} value={year}>
                {year}년
              </option>
            ))}
          </select>
          <select className="form-select duration-select">
            <option value="">개월</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}월
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 현재 직업 준비 상태 폼 */}
      <div className="form-group">
        <div
          className="accordion-header"
          onClick={() => setPrepStatus(!prepStatus)}
        >
          <label className="form-label">현재 취업 준비 상태</label>
          <span className={`arrow ${prepStatus ? "open" : ""}`}>▼</span>
        </div>

        {prepStatus && (
          <div className="checkbox-group">
            {prepOptions.map((option) => (
              <div key={option.id} className="checkbox-item">
                <input
                  type="checkbox"
                  id={option.id}
                  className="checkbox-input"
                />
                <label htmlFor={option.id} className="checkbox-label">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* 취업 중 어려운 점 폼 */}
      <div className="form-group">
        <label className="form-label">취업 중 어려운 점</label>
        <div className="difficulties-container">
          {difficulties.map((item) => (
            <div key={item.id} className="radio-item">
              <input
                type="radio"
                id={item.id}
                name="difficulty"
                className="radio-input"
              />
              <label htmlFor={item.id} className="radio-label">
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* 취업 루틴관리에 관심이 있나요? 폼 */}
      <div className="form-group">
        <label className="form-laber">취업 루틴관리에 관심이 있나요?</label>
        <div className="routine-interest-container">
          <div className="radio-button-group">
            <input
              type="radio"
              id="routineYes"
              name="routineInterest"
              value="yes"
              className="radio-input"
            />
            <label htmlFor="routineYes" className="radio-label">
              네
            </label>

            <input
              type="radio"
              id="routineNo"
              name="routineInterest"
              value="no"
              className="radio-input"
            />
            <label htmlFor="routineNo" className="radio-label">
              아니요
            </label>
          </div>
        </div>
      </div>

      {/* 확인 버튼 */}
      <button type="submit" className="submit-button">
        확인완료
      </button>
    </div>
  );
};

export default SingUp;
