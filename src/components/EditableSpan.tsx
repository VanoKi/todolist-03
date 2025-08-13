import {useState} from "react";

type Props = {
  value: string
};
export const EditableSpan = ({value}: Props) => {
  const [isEdit, setIsEdit] = useState(false)
  const turnOnEditMode = () => {
    setIsEdit(true)
  }
  const turnOffEditMode = () => {
    setIsEdit(false)
  }
  return (
    <>
      {isEdit ? (
        <input value={value} autoFocus onBlur={turnOffEditMode}/>
      ) : (
        <span onDoubleClick={turnOnEditMode}>{value}</span>
      )}
    </>
  );
};