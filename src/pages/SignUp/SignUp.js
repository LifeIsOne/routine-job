import React, { useState } from "react";
import "./SignUp.css"

const SignUp = () => {
  const [prepStatus, setPrepStatus] = useState(true); // 아코디언 상태
  const [difficultyStatus, setDifficultyStatus] = useState(false); // 취업 어려운 점 상태

  // 선택 항목 리스트
  // 현재 직업 준비 상태 폼
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
  // 취업 중 어려운 점 폼
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
    // 폼 컨테이나
    <div className="container">
      {/* 헤더 現 로고만 */}
      <div className="header"> 
        <div className="header-logo">
          <img
            className="img"
            alt="Login Banner"
            src="/assets/images/login/login-banner-img.png"
          />
        </div>
      </div>

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
        <input type="date" className="form-input" placeholder="연/월/일" />
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
          <select className="form-select duration-select" defaultValue={"0"}>
            {/* <option value="">년</option> */}
            {[0, 1, 2, 3, 4, 5].map((year) => (
              <option key={year} value={year}>
                {year} 년
              </option>
            ))}
          </select>
          <select className="form-select duration-select" defaultValue={"0"}>
            {/* <option value="0">0 개월</option> */}
            {[...Array(11)].map((_, i) => (
              <option key={i} value={i}>
                {i} 개월
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 현재 직업 준비 상태 폼 */}
      <div className="form-group">
        <label label className="form-label">현재 취업 준비 상태</label>
        <div
          className="accordion-header"
          onClick={() => setPrepStatus(!prepStatus)}
        >
          <span>전부 선택하세요</span>
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
        <div
          className="accordion-header"
          onClick={() => setDifficultyStatus(!difficultyStatus)}
        >
          <span>전부 선택하세요</span>
          <span className={`arrow ${difficultyStatus ? "open" : ""}`}>▼</span>
        </div>

        {difficultyStatus && (
          <div className="checkbox-group">
            {difficulties.map((item) => (
              <div key={item.id} className="checkbox-item">
                <input
                  type="checkbox"
                  id={item.id}
                  className="checkbox-input"
                />
                <label htmlFor={item.id} className="checkbox-label">
                  {item.label}
                </label>
              </div>
            ))}
          </div>
        )}
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

export default SignUp;
