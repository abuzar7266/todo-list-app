import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateTask,
  deleteTask,
  taskMarkdone,
} from "redux/feature/todo-list/todoSlice";
import { SquareOutlined } from "@mui/icons-material";
import { CheckBox } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";
import "asset/css/listItem.css";
import { wait } from "@testing-library/user-event/dist/utils";

const ListItem = ({ task }) => {
  const dispatch = useDispatch();
  const [stateTodo, setStateTodo] = useState(null);
  return (
    <tr>
      <td colSpan={10} className="column-1">
        {!task.isChecked ? (
          <SquareOutlined
            className="icon-format"
            onClick={() => {
              dispatch(taskMarkdone(task.id));
            }}
          />
        ) : (
          <CheckBox className="icon-format" />
        )}

        {stateTodo ? (
          <form
            onSubmitCapture={e => {
              e.preventDefault();
              dispatch(
                updateTask({
                  id: stateTodo.id,
                  description: stateTodo.description,
                })
              );
              setStateTodo(null);
            }}
          >
            <input
              type="text"
              name="update-task"
              value={stateTodo.description}
              onChange={e => {
                setStateTodo({ ...stateTodo, description: e.target.value });
              }}
            />
          </form>
        ) : (
          <span className={task.isChecked ? "task-text" : ""}>
            {task.description}
          </span>
        )}
      </td>
      <td className="column-2">
        <Edit
          className="icon-format"
          onClick={() => {
            if (!stateTodo) setStateTodo(task);
          }}
        />
        <Delete
          className="icon-format"
          onClick={() => {
            dispatch(deleteTask(task.id));
          }}
        />
      </td>
    </tr>
  );
};

export default ListItem;
