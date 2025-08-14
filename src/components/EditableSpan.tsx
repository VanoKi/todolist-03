import {ChangeEvent, useState} from "react";

type Props = {
  value: string
  onChange: (title: string) => void
};
export const EditableSpan = ({value, onChange}: Props) => {
  const [title, setTitle] = useState(value)
  const [isEdit, setIsEdit] = useState(false)
  const turnOnEditMode = () => {
    setIsEdit(true)
  }
  const turnOffEditMode = () => {
    setIsEdit(false)
    onChange(title)
  }
  const changeTitle = (event:ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }
  return (
    <>
      {isEdit ? (
        <input value={title} autoFocus onBlur={turnOffEditMode} onChange={changeTitle}/>
      ) : (
        <span onDoubleClick={turnOnEditMode}>{value}</span>
      )}
    </>
  );
};