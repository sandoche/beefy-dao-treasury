import Head from 'next/head';

import sharedStrings from '@/locales/en/shared';

export default function PageHead() {
  return (
    <Head>
      <title>{sharedStrings.title}</title>
      <meta name="description" content={sharedStrings.title} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
