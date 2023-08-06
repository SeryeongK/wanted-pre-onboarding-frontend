import { BASE_URL } from "./preURL";

export const signUp_api = async (email: string, password: string) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    if (res.status === 201) {
      return { statusCode: 201, message: "회원가입에 성공했습니다." };
    } else if (res.status === 400) {
      return {
        statusCode: 400,
        message: "존재하는 이메일입니다. 다른 이메일로 회원가입해주세요",
      };
    } else {
      throw new Error("오류가 발생했습니다.");
    }
  } catch (err) {
    return { err: err, message: "오류가 발생했습니다." };
  }
};
