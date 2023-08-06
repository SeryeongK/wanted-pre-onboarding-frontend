import { BASE_URL } from "./preURL";

export const signIn_api = async (email: string, password: string) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    if (res.status === 200) {
      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      return { statusCode: 200, message: "로그인되었습니다." };
    } else if (res.status === 401) {
      return {
        statusCode: 401,
        message: "비밀번호가 틀렸습니다.",
      };
    } else {
      throw new Error("오류가 발생했습니다.");
    }
  } catch (err) {
    return { err: err, message: "오류가 발생했습니다." };
  }
};
