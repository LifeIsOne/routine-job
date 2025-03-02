import "./App.css";

function App() {
  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* 헤더 */}
        <div className="login-header">
          <div className="login-banner">
            <img
              className="img"
              alt="Login Banner"
              src="/assets/images/login/login-banner-img.png"
            />
            <div className="login-banner-text">
              <div className="login-banner-text-1">
                루틴을 통해 취업을 잡는다
              </div>
              <div className="login-banner-text-2">
                매일의 작은 루틴, 루틴잡에서
              </div>
            </div>
          </div>
        </div>

        {/* 배경 장식 */}
        <div className="login-overlap-content">
          <div className="login-overlap-content-1"></div>
          <div className="login-overlap-content-2"></div>
          <div className="login-overlap-content-3"></div>
        </div>

        {/* 로그인 버튼 */}
        <div className="login-auth-buttons">
          <div className="login-kakao-button">
            <div className="login-kakao-button-content">
              {/* <img className="img-2" alt="Ic logo kakao" src={icLogoKakao16} /> */}

              <div className="login-auth-text">카카오로 시작하기</div>
            </div>
          </div>

          <div className="login-google-button">
            <div className="login-google-button-content">
              {/* <img className="img-2" alt="Frame" src={frame1171277550} /> */}
              <div className="login-auth-text">구글로 시작하기</div>
            </div>
          </div>
        </div>

        <div className="login-footer">
          <div className="login-footer-question">궁금하신 점이 있으신가요?</div>

          <div className="login-footer-contact">문의하기</div>
        </div>
      </div>
    </div>
  );
}

export default App;
