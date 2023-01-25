interface Props {
  height?: string;
  width?: string;
}

export default function LoadingPlaceholder({ height = '', width = '' }: Props) {
  return (
    <div
      className="animate-pulse w-full h-3 bg-borders rounded-full"
      style={{
        height,
        width,
      }}
    ></div>
  );
}
