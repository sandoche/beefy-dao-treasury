import PageHead from '@/components/shared/PageHead';

interface Props {
  children: JSX.Element;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <PageHead />
      <main>{children}</main>
    </>
  );
}
