import { Await } from '@components/helpers/Await';
import type { Locale } from '@i18n';

import DecorationsSection from '../DecorationsSection/DecorationsSection';
import Pagination from '../shared/Pagination/Pagination';
import Tabs from '../Tabs/Tabs';
import WaxDesc from '../WaxDesc/WaxDesc';

import styles from './DecorationsPage.module.scss';

interface DecorationsPageI {
  dictWax: {
    waxDesc: {
      title: string;
      text: string;
      volumeLabel?: string;
    };
  };
  dict: {
    tabs: {
      fullTitle: string[];
      abbreviatedTitle: string[];
    };
    filter: any;
  };
  lang: Locale;
  decorations: Promise<CandleApiResponse>;
  paginBtnDict: string;
}

const DecorationsPage: React.FC<DecorationsPageI> = ({
  dictWax,
  dict,
  lang,
  decorations,
  paginBtnDict,
}) => {
  return (
    <>
      <Tabs dict={dict} lang={lang} />
      <WaxDesc dict={dictWax?.waxDesc} className={styles.waxDescAboveCandles} />
      <DecorationsSection
        dict={dict}
        candles={decorations}
        paginBtnDict={paginBtnDict}
      />
      <Await promise={decorations}>
        {({ totalPages }) => <Pagination totalPages={totalPages} />}
      </Await>
      <WaxDesc dict={dictWax?.waxDesc} className={styles.waxDescBelowCandles} />
    </>
  );
};

export default DecorationsPage;
