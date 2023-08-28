import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SquareOutlined } from "@mui/icons-material";
import { CheckBox } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";
import {
  updateTask,
  deleteTask,
  taskMarkdone,
} from "redux/feature/todo-list/todoSlice";
import "asset/css/listItem.css";

const listItemSchema = yup
  .object({
    description: yup.string().min(5).max(30).required(),
  })
  .required();
const ListItem = ({ task, state, handleEditable }) => {
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
  useEffect(()=>{
    handleEditable('', 0);
  },[task]);

  const onSubmitHandler = (e) => {
    dispatch(
      updateTask({
        id: task.id,
        description: e["description"],
      })
    );
    handleEditable('', !state.isEditable);
    reset();
  };

  return (
    <tr>
      <td>
        <div className="d-flex p-1" id={task.id}>
          {!task.isChecked ? (
            <SquareOutlined
              className="icon-format"
              onClick={() => {
                dispatch(taskMarkdone({id: task.id, isChecked: !task.isChecked}));
              }}
            />
          ) : (
            <CheckBox className="icon-format" onClick={() => {
              dispatch(taskMarkdone({id: task.id, isChecked: !task.isChecked}));
            }}/>
          )}
          {(state.isEditable && task.id==state.id) ? (
            <form onSubmitCapture={handleSubmit(onSubmitHandler)} id={task.id}>
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
      <td className="col-8"></td>
      <td>
        <Edit
          className="icon-format"
          onClick={(e) => {
            setValue("description", task.description);
            if(state.isEditable && task.id!=state.id)
              handleEditable(task.id, state.isEditable);
            else if(state.isEditable && task.id===state.id){
              handleEditable('-', !state.isEditable);
            }else{
              handleEditable(task.id, !state.isEditable);
            }
          }}
        />
        <Delete
          className="icon-format"
          onClick={() => {
            dispatch(deleteTask(task.id));
            reset();
          }}
        />
      </td>
    </tr>
  );
};

export default ListItem;
