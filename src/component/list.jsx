import React from "react";
import ListItem from "./listItem";
import "asset/css/list.css";
const List = ({ taskList, setTaskList }) => {
  return (
    <>
      <table className="table table-sm list-block">
        <tbody className="list-body">
          {taskList.map((data, idx) => {
            return (
                <ListItem 
                  key={idx}
                  taskList={taskList}
                  setTaskList={setTaskList}
                  task={data}
                />
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default List;
