import "../App.css"; // 필요시 경로 확인

function LoginSuccess() {
  //
  const handleSignUp = () => {
    window.location.href = "/sign-up";
  };
  return (
    <div
      className="login-container"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <p>OAuth 로그인 페이지</p>
      <button onClick={handleSignUp}>가입하기</button>
    </div>
  );
}

export default LoginSuccess;
