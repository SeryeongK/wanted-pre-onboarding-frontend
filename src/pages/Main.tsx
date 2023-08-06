import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Main() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/todo");
    }
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-1/2 h-2/3 flex flex-col justify-center items-center">
        <p className="text-3xl py-16">TODO</p>
        <div className="py-[1rem]">
          <p
            className="px-[5rem] py-2 rounded border-2 border-blue-500"
            onClick={() => navigate("/signup")}
          >
            회원가입하기
          </p>
        </div>
        <div className="py-[1rem]">
          <p
            className="px-[5.5rem] py-2 rounded bg-blue-500 text-white"
            onClick={() => navigate("/signin")}
          >
            로그인하기
          </p>
        </div>
      </div>
    </div>
  );
}
