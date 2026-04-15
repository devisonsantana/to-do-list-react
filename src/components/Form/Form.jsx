import style from "./Form.module.css";
import { TextField, Button, BUTTON_TYPES, Loading } from "../";
import { useState } from "react";
import { useAppContext } from "../../hooks";

const Form = () => {
  const { addTask, createLoading } = useAppContext();
  const [taskName, setTaskName] = useState("");

  const onChangeTaskName = (event) => {
    setTaskName(event.currentTarget.value);
  };

  const handleAddTask = (event) => {
    event.preventDefault();
    if (!taskName.trim()) {
      return;
    }
    addTask(taskName.trim());
    setTaskName("");
  };

  return (
    <form className={style.Form} onSubmit={handleAddTask}>
      <TextField
        value={taskName}
        onChange={onChangeTaskName}
        placeholder="Write a task..."
      />
      {createLoading ? (
        <Loading text="Adding..."/>
      ) : (
        <Button typeButton={BUTTON_TYPES.PRIMARY}>Add</Button>
      )}
    </form>
  );
};

export { Form };
