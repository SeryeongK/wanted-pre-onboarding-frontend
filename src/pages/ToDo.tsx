import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createTodos_api,
  deleteTodo_api,
  getTodos_api,
  updateTodo_api,
} from "../apis/ToDoApi";
import { TodoType } from "../types/ToDo.type";

export default function Todo() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editedTodo, setEditedTodo] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    } else {
      handleGetTodos();
    }
  }, []);

  const handleGetTodos = async () => {
    const { statusCode, data, err, message } = await getTodos_api();
    if (statusCode === 200) {
      console.log(data);
      setTodos(data);
    } else {
      console.log(err, message);
    }
  };

  const handleCreate = async () => {
    const { statusCode, err, message } = await createTodos_api(newTodo);
    if (statusCode === 201) {
      console.log(message);
      handleGetTodos();
      setNewTodo("");
    } else {
      console.log(err, message);
    }
  };

  const handleEdit = (id: number) => {
    // 해당 인덱스 항목의 isEditing 값을 토글하여 수정 모드로 변경
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isEditing: !todo.isEditing,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleUpdate = async (
    id: number,
    todo: string,
    isCompleted: boolean
  ) => {
    const { statusCode, err, message } = await updateTodo_api(
      id,
      todo,
      isCompleted
    );
    if (statusCode === 200) {
      console.log(message);
      handleGetTodos();
    } else {
      console.log(err, message);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    const { statusCode, err, message } = await deleteTodo_api(id);
    if (statusCode === 204) {
      console.log(message);
      handleGetTodos();
    } else {
      console.log(err, message);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div>
        <h1>TODO</h1>
        <button
          onClick={() => {
            localStorage.setItem("token", "");
            navigate("/signin");
          }}
        >
          로그아웃
        </button>
      </div>
      <div>
        <input
          type="text"
          data-testid="new-todo-input"
          name="new_todo"
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
        />
        <button data-testid="new-todo-add-button" onClick={handleCreate}>
          추가
        </button>
      </div>
      <div>
        {todos.map((t) => {
          return (
            <li key={t.id}>
              <label>
                <input
                  type="checkbox"
                  checked={t.isCompleted}
                  onChange={() => handleUpdate(t.id, t.todo, !t.isCompleted)}
                />
                {!t.isEditing ? (
                  <span>{t.todo}</span>
                ) : (
                  <input
                    type="text"
                    data-testid="modify-input"
                    name="edited_todo"
                    value={editedTodo}
                    onChange={(e) => {
                      setEditedTodo(e.target.value);
                    }}
                  />
                )}
              </label>
              {!t.isEditing ? (
                <>
                  <button
                    data-testid="modify-button"
                    onClick={() => {
                      handleEdit(t.id);
                      setEditedTodo(t.todo);
                    }}
                  >
                    수정
                  </button>
                  <button
                    data-testid="delete-button"
                    onClick={() => {
                      handleDeleteTodo(t.id);
                    }}
                  >
                    삭제
                  </button>
                </>
              ) : (
                <>
                  <button
                    data-testid="submit-button"
                    onClick={() =>
                      handleUpdate(t.id, editedTodo, t.isCompleted)
                    }
                  >
                    제출
                  </button>
                  <button
                    data-testid="cancel-button"
                    onClick={() => handleEdit(t.id)}
                  >
                    취소
                  </button>
                </>
              )}
            </li>
          );
        })}
      </div>
    </div>
  );
}
