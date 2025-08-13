import {Button} from "./Button.tsx";
import {type ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
  onCreateItem: (title: string) => void
};
export const CreateItemForm = (props: Props) => {
  const {onCreateItem} = props
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)
  const createItemHandler = () => {
    const trimmedTitle = title.trim()
    if (trimmedTitle !== '') {
      onCreateItem(trimmedTitle)
      setTitle('')
    }else{
      setError('Title is required')
    }
  }
  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
    setError(null)
  }
  const createTaskOnEnterHandler = (event:KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createItemHandler()
    }
    if (event.key === 'Escape') {
      setTitle('')
    }}

  return (
    <div>
      <input
        className={error ? 'error' : ''}
        value={title}
        onChange={changeTaskTitleHandler}
        onKeyDown={createTaskOnEnterHandler}
      />
      <Button title={'+'} onclick={createItemHandler}/>
      {error && <div className={'error-message'}>{error}</div>}
    </div>
  );
};