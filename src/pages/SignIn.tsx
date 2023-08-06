import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn_api } from "../apis/SignInApi";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/todo");
    }
  }, []);

  const handleSignIn = async () => {
    const { statusCode, err, message } = await signIn_api(email, password);
    if (statusCode === 200) {
      console.log(statusCode, message);
      navigate("/todo");
    } else if (statusCode === 401) {
      console.log(statusCode, message);
    } else {
      console.log(err, message);
    }
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1>로그인</h1>
      <div>
        <div>
          <p>이메일</p>
          <input
            type="text"
            data-testid="email-input"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        {!email.includes("@") && (
          <p>이메일 형식이 잘못되었습니다. * @가 포함되어야 합니다.</p>
        )}
        <div>
          <p>비밀번호</p>
          <input
            type="text"
            data-testid="password-input"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        {password.length < 8 && <p>비밀번호는 8자 이상이어야 합니다.</p>}
      </div>
      <button
        data-testid="signin-button"
        disabled={!email.includes("@") || password.length < 8}
        className="px-4 py-2 rounded bg-blue-500 text-white disabled:bg-opacity-50 disabled:cursor-not-allowed"
        onClick={handleSignIn}
      >
        로그인하기
      </button>
    </div>
  );
}