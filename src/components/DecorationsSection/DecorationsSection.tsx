import { Suspense } from 'react';
import { DecorationsSectionI } from '@components/types';

import Container from '../Container/Container';
import Filter from '../Filter/Filter';
import Section from '../Section/Section';
import CandlesSkeleton from '../Skeletons/CandlesSkeleton/CandlesSkeleton';

import DecorationList from './DecorationList/DecorationList';

import styles from './DecorationsSection.module.scss';

const DecorationsSection: React.FC<DecorationsSectionI> = ({
  dict,
  candles,
  paginBtnDict,
}) => {
  return (
    <Section id="decorations-section" className={styles.section}>
      <Container className={styles.container}>
        <Filter dict={dict.filter} className={styles.filter} />
        <Suspense fallback={<CandlesSkeleton />}>
          <DecorationList items={candles} paginBtnDict={paginBtnDict} />
        </Suspense>
      </Container>
    </Section>
  );
};

export default DecorationsSection;
