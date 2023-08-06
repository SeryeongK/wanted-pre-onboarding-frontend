import { BASE_URL } from "./preURL";

export const createTodos_api = async (todo: string) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // 올바른 Content-Type 설정
      },
      body: JSON.stringify({ todo: todo }),
    });

    if (res.status === 201) {
      return { statusCode: 201, message: "새로운 Todo가 추가되었습니다." };
    } else {
      throw new Error("오류가 발생했습니다.");
    }
  } catch (err) {
    return { err: err, message: "오류가 발생했습니다." };
  }
};

export const getTodos_api = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${BASE_URL}/todos`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      const fetchedData = await res.json();
      return { statusCode: 200, data: fetchedData };
    } else {
      throw new Error("오류가 발생했습니다.");
    }
  } catch (err) {
    return { err: err, message: "오류가 발생했습니다." };
  }
};

export const updateTodo_api = async (
  id: number,
  todo: string,
  isCompleted: boolean
) => {
  console.log(id, todo, isCompleted);
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${BASE_URL}/todos/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: todo, isCompleted: isCompleted }),
    });

    if (res.status === 200) {
      return { statusCode: 200, message: "수정에 성공했습니다." };
    } else {
      throw new Error("오류가 발생했습니다.");
    }
  } catch (err) {
    return { err: err, message: "오류가 발생했습니다." };
  }
};

export const deleteTodo_api = async (id: number) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${BASE_URL}/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 204) {
      return { statusCode: 204, message: "삭제에 성공했습니다." };
    } else {
      throw new Error("오류가 발생했습니다.");
    }
  } catch (err) {
    return { err: err, message: "오류가 발생했습니다." };
  }
};
