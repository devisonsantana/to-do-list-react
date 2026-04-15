import style from "./Button.module.css";
import { BUTTON_TYPES } from "./buttonTypes";

const Button = (props) => {
  const { children, typeButton = BUTTON_TYPES.PRIMARY, ...othersProps } = props;
  return (
    <button typebutton={typeButton} className={style.Button} {...othersProps}>
      {children}
    </button>
  );
};

export { Button };
