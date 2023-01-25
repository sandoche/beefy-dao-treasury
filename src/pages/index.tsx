import Link from 'next/link';

import Container from '@/components/shared/Container';
import Navbar from '@/components/shared/Navbar';
import homeStrings from '@/locales/en/home';

export default function Home() {
  return (
    <>
      <Navbar />
      <section>
        <Container>
          <div className=" w-full md:w-3/4 py-32">
            <h1 className="text-5xl font-bold mb-8">{homeStrings.headline}</h1>
            <p className="text-xl mb-8">{homeStrings.description}</p>
            <Link
              href="/treasury"
              className="inline-flex items-center rounded-md border border-transparent bg-brand px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
            >
              {homeStrings.button}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
