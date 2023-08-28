import React, { useState } from "react";
import { connect } from "react-redux";
import ListItem from "./listItem";
import "asset/css/list.css";

const mapStateToProps = (state) => ({
  taskList: state.todo.taskList,
});
const List = ({ taskList }) => {
  const [state, setState] = useState({
    id: "",
    isEditable: 0,
  });
  const handleEditable = (id, isEditable) => {
    setState({ id: id, isEditable: isEditable });
  };
  return (
    <>
      <table className="table table-sm list-block">
        <tbody className="list-body">
          {taskList.map((data, idx) => {
            return (
              <ListItem
                key={idx}
                task={data}
                state={state}
                handleEditable={handleEditable}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default connect(mapStateToProps)(List);
