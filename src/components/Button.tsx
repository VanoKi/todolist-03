type Props = {
  title: string
  onclick: () => void
  className?: string
}

export const Button = ({title, onclick, className}: Props) => {
  return <button
    onClick={onclick}
    className={className}
  >
    {title}
  </button>
}