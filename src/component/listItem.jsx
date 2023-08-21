import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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

const listItemSchema = yup
  .object({
    description: yup.string().min(5).max(30).required(),
  })
  .required();
const ListItem = ({ task }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(listItemSchema),
  });
  const [stateTodo, setStateTodo] = useState(0);

  const onSubmitHandler = (e) => {
    dispatch(
      updateTask({
        id: task.id,
        description: e["description"],
      })
    );
    setStateTodo(!stateTodo);
    reset();
  };

  return (
    <tr>
      <td>
        <div className="d-flex p-1">
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
            <form onSubmitCapture={handleSubmit(onSubmitHandler)}>
              <input type="text" {...register("description")} />
              <p className="text-danger">{errors.description?.message}</p>
            </form>
          ) : (
            <span className={task.isChecked ? "task-text" : ""}>
              {task.description}
            </span>
          )}
        </div>
      </td>
      <td>
        <Edit
          className="icon-format"
          onClick={(e) => {
            setValue("description", task.description);
            setStateTodo(!stateTodo);
          }}
        />
      </td>
      <td>
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
