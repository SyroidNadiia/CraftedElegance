import Breadcrumbs from '@components/components/Breadcrumbs/Breadcrumbs';
import CandlesPage from '@components/components/CandlesPage/CandlesPage';
import { getCandles } from '@lib/api-services/api';
import { getDictionary } from '@lib/utils/dictionary';

import { Locale } from '../../../../../i18n-config';

import { convertStringToNumber } from './../../../../helpers/convertStringToNumber';

export async function generateMetadata({
  params: { slug, lang },
}: {
  params: {
    slug: 'soy-candles' | 'coconut-candles' | 'palm-candles';
    lang: Locale;
  };
}) {
  const { breadcrumbs } = await getDictionary(lang);

  return {
    title: `Valwax | ${breadcrumbs[slug]}`,
  };
}

export default async function Page({
  params: { slug, lang },
  searchParams,
}: {
  params: {
    slug: 'soy-candles' | 'coconut-candles' | 'palm-candles';
    lang: Locale;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { breadcrumbs, page } = await getDictionary(lang);

  const currentPage = convertStringToNumber(searchParams.page, 1);
  const perPage = convertStringToNumber(searchParams.perPage, 9);

  const promise = getCandles(currentPage, perPage);

  return (
    <>
      <Breadcrumbs
        items={[
          {
            label: breadcrumbs[slug],
            path: `/candles/${slug}`,
          },
        ]}
        lang={lang}
      />
      <CandlesPage
        dictWax={page.candles[slug]}
        dict={page.candles}
        lang={lang}
        candles={promise}
      />
    </>
  );
}
