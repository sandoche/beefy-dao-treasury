interface Props {
  children: JSX.Element;
}

export default function Container({ children }: Props) {
  return <div className="container mx-auto px-4">{children}</div>;
}
