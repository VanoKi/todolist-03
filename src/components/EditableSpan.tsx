import {useState} from "react";

type Props = {
  value: string
};
export const EditableSpan = ({value}: Props) => {
  const [isEdit, setIsEdit] = useState(false)
  const turnOnEditMode = () => {
    setIsEdit(true)
  }
  return (
    <>
      {isEdit ? (
        <input value={value} autoFocus/>
      ) : (
        <span onDoubleClick={turnOnEditMode}>{value}</span>
      )}
    </>
  );
};