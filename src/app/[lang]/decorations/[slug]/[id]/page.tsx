import Breadcrumbs from '@components/components/Breadcrumbs/Breadcrumbs';
import DecorationDetailsSection from '@components/components/DecorationDetailsPage/DecorationDetailsSection/DecorationDetailsSection';
import RelatedProducts from '@components/components/shared/RelatedProducts/RelatedProducts';
import { convertToServerLocale } from '@components/helpers/convertToServerLocale';
import { Locale } from '@i18n';
import { fetchCandleById } from '@lib/api-services/fetchCandleById';
import { fetchSimilarProducts } from '@lib/api-services/fetchSimilarProducts';
import { getDictionary } from '@lib/utils/dictionary';

export async function generateMetadata({
  params: { lang, id },
}: {
  params: {
    lang: Locale;
    id: string;
  };
}) {
  const currentLang = convertToServerLocale(lang);
  const decoration = await fetchCandleById({ id, currentLang });
  return {
    title: `CraftedElegance | ${decoration.name}`,
  };
}

export default async function Decoration({
  params: { lang, id, slug },
}: {
  params: {
    lang: Locale;
    id: string;
    slug: 'bracelet' | 'earrings' | 'necklace';
  };
}) {
  const {
    breadcrumbs,
    relatedProducts: { title },
    general: { buttons, messages },
    productDescription,
  } = await getDictionary(lang);

  const currentLang = convertToServerLocale(lang);

  const decoration = await fetchCandleById({ id, currentLang });
  const similarProducts = await fetchSimilarProducts({ id, currentLang });

  return (
    <>
      <Breadcrumbs
        items={[
          {
            label: breadcrumbs[slug],
            path: `/decorations/${slug}`,
          },
          {
            label: decoration.name,
            path: `/decorations/${slug}/${decoration.id}`,
          },
        ]}
        lang={lang}
      />
      {/* <DecorationDetailsSection
        product={decoration}
        buttonsDict={buttons}
        toastMessages={messages}
        productDescriptionDict={productDescription}
      />
      <RelatedProducts relatedProducts={similarProducts} title={title} /> */}
    </>
  );
}
