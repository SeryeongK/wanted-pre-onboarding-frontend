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
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-1/2 h-2/3 flex flex-col justify-center items-center border-2 rounded-md">
        <div className="flex flex-col w-full">
          <p className="text-3xl text-center">TODO</p>
          <div className="flex w-full justify-end pr-4">
            <button
              onClick={() => {
                localStorage.setItem("token", "");
                navigate("/signin");
              }}
              className="text-sm text-gray-500"
            >
              로그아웃
            </button>
          </div>
        </div>
        <div className="w-full px-10 flex flex-row justify-between py-[2rem]">
          <input
            type="text"
            data-testid="new-todo-input"
            name="new_todo"
            value={newTodo}
            onChange={(e) => {
              setNewTodo(e.target.value);
            }}
            className="w-full border-b-2"
          />
          <button
            data-testid="new-todo-add-button"
            onClick={handleCreate}
            className="w-16 px-2 py-1 bg-blue-500 text-white rounded mx-2"
          >
            추가
          </button>
        </div>
        <div className="w-full px-10">
          {todos.map((t) => {
            return (
              <li
                key={t.id}
                className="list-none w-full px-2 py-2 my-1 flex justify-between"
              >
                <label className="w-full bg-slate-200 w-full px-2 py-2">
                  <input
                    type="checkbox"
                    checked={t.isCompleted}
                    onChange={() => handleUpdate(t.id, t.todo, !t.isCompleted)}
                    className="mx-2"
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
                      className="w-16 px-2 bg-blue-500 text-white rounded mx-2"
                    >
                      수정
                    </button>
                    <button
                      data-testid="delete-button"
                      onClick={() => {
                        handleDeleteTodo(t.id);
                      }}
                      className="w-16 px-2 bg-rose-500 text-white rounded"
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
                      className="w-16 px-2 bg-blue-500 text-white rounded mx-2"
                    >
                      제출
                    </button>
                    <button
                      data-testid="cancel-button"
                      onClick={() => handleEdit(t.id)}
                      className="w-16 px-2 bg-rose-500 text-white rounded"
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
    </div>
  );
}
