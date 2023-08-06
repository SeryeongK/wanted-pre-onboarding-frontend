import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn_api } from "../apis/SignInApi";
import { CiWarning } from "react-icons/ci";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

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
      setErrMsg(message);
    } else {
      console.log(err, message);
      setErrMsg(message);
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-1/2 h-2/3 flex flex-col justify-center items-center border-2 rounded-md">
        <p className="text-xl py-[5rem]">로그인</p>
        <div>
          <div className="flex flex-row">
            <p className="w-[5rem]">이메일</p>
            <div className="h-[4rem]">
              <input
                type="text"
                data-testid="email-input"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-56 border-b-2"
              />
              {!email.includes("@") && (
                <p className="text-sm py-1 text-rose-600">
                  형식이 잘못되었습니다.(@ 미포함)
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-row">
            <p className="w-[5rem]">비밀번호</p>
            <div className="h-[4rem]">
              <input
                type="text"
                data-testid="password-input"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="w-56 border-b-2"
              />
              {password.length < 8 && (
                <p className="text-sm py-1 text-rose-600">
                  비밀번호는 8자 이상이어야 합니다.
                </p>
              )}
            </div>
          </div>
        </div>
        {errMsg.length > 1 && (
          <div className="px-[2.5rem] py-2 rounded bg-rose-400 flex flex-row">
            <CiWarning className="text-white" />
            <p className="text-sm text-white px-1">{errMsg}</p>
            <CiWarning className="text-white" />
          </div>
        )}
        <div className="py-[1.5rem]">
          <button
            data-testid="signin-button"
            disabled={!email.includes("@") || password.length < 8}
            className="px-[7.7rem] py-2 rounded bg-blue-500 text-white disabled:bg-opacity-50 disabled:cursor-not-allowed"
            onClick={handleSignIn}
          >
            로그인하기
          </button>
        </div>
        <div className="flex flex-row ">
          <p className="px-2 text-xs text-gray-500">
            새로운 계정을 만들고 싶으신가요?
          </p>
          <p onClick={() => navigate("/signup")} className="px-2 text-xs">
            회원가입하기
          </p>
        </div>
      </div>
    </div>
  );
}
