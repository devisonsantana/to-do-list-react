import style from "./Item.module.css";
import { BUTTON_TYPES, Button, Loading, TextField } from "../../";
import { useAppContext } from "../../../hooks";
import { useEffect, useRef, useState } from "react";

const Item = (props) => {
  const { id, name, isNew } = props;
  const { deleteTask, editTask, editLoading, deleteLoading } = useAppContext();
  const [editing, setEditing] = useState(false);

  const saveUpdate = (event) => {
    const taskName = event.target.value.trim();
    if (taskName.trim() && taskName !== name) {
      editTask(id, taskName);
    }
    setEditing(false);
  };

  const onPressEnter = (event) => {
    if (event.key === "Enter") {
      saveUpdate(event);
    }
  };

  const isEditingLoading = editLoading.includes(id);
  const isDeletingLoading = deleteLoading.includes(id);

  const itemRef = useRef(null);

  useEffect(() => {
    if (itemRef.current && isNew) {
      itemRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className={style.Item} ref={itemRef}>
      {editing && !isEditingLoading && (
        <TextField
          onBlur={saveUpdate}
          onKeyDown={onPressEnter}
          defaultValue={name}
          autoFocus
        />
      )}

      {!editing && !isEditingLoading && !isDeletingLoading && (
        <p onDoubleClick={() => setEditing(true)}>{name}</p>
      )}

      {isEditingLoading && <Loading text="Updating..." />}
      {isDeletingLoading && <Loading text="Removing..." />}

      {!isEditingLoading && !isDeletingLoading && (
        <div className={style.Buttons}>
          <Button
            onClick={() => deleteTask(id)}
            typeButton={BUTTON_TYPES.SECONDARY}
          >
            <i className="bi bi-trash"></i>
          </Button>
          <Button
            onClick={() => setEditing(true)}
            typeButton={BUTTON_TYPES.TERTIARY}
          >
            <i className="bi bi-pencil"></i>
          </Button>
        </div>
      )}
    </div>
  );
};

export { Item };
