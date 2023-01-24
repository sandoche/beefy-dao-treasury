interface Props {
  children: JSX.Element;
}

export default function Container({ children }: Props) {
  return <div className="w-auto max-w-2xl">{children}</div>;
}
