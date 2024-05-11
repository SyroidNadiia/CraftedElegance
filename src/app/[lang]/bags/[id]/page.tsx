import BagsDetailsPage from '@components/components/BagsDetailsPage/BagsDetailsPage';
import Breadcrumbs from '@components/components/Breadcrumbs/Breadcrumbs';
import RelatedProducts from '@components/components/shared/RelatedProducts/RelatedProducts';
import { convertToServerLocale } from '@components/helpers/convertToServerLocale';
import type { Locale } from '@i18n';
import { fetchBagsById } from '@lib/api-services/fetchBagsById';
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

  const bags = await fetchBagsById({ id, currentLang });

  return {
    title: `CraftedElegance | ${bags.title}`,
  };
}

const BagsDetails = async ({
  params: { lang, id },
}: {
  params: { lang: Locale; id: string };
}) => {
  const {
    breadcrumbs,
    relatedProducts,
    general: { buttons, messages },
    productDescription,
    page: {
      embroidery: { configurator },
    },
  } = await getDictionary(lang);

  const currentLang = convertToServerLocale(lang);

  const bags = await fetchBagsById({ id, currentLang });
  const similarProducts = await fetchSimilarProducts({ id, currentLang });

  return (
    <>
      <Breadcrumbs
        items={[
          {
            label: breadcrumbs.bags,
            path: '/bags',
          },
          {
            label: bags.name,
            path: `/bags/${bags.id}`,
          },
        ]}
        lang={lang}
      />
      <BagsDetailsPage
        product={bags}
        buttonsDict={buttons}
        toastMessages={messages}
        productDescriptionDict={productDescription}
        configuratorDict={configurator}
      />
      <RelatedProducts
        relatedProducts={similarProducts}
        title={relatedProducts.title}
      />
    </>
  );
};

export default BagsDetails;
