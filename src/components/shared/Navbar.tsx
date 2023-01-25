import Link from 'next/link';

import Container from '@/components/shared/Container';
import sharedStrings from '@/locales/en/shared';

interface Props {
  children?: JSX.Element;
}

export default function Navbar({ children }: Props) {
  return (
    <nav className="border-b border-brand mb-8">
      <Container>
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl uppercase py-10">
            (₿) {sharedStrings.title}
          </Link>
          <div>{children}</div>
        </div>
      </Container>
    </nav>
  );
}
