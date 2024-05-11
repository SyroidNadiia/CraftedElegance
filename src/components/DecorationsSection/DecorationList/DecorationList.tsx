import type { DecorationDetailsI } from '../../../types';
import MobilePagination from '../../shared/MobilePagination/MobilePagination';
import DecorationItemCard from '../DecorationItemCard/DecorationItemCard';

import styles from './DecorationList.module.scss';

interface DecorationListProps {
  items: Promise<CandleApiResponse>;
  paginBtnDict: string;
}

const DecorationList: React.FC<DecorationListProps> = async ({
  items,
  paginBtnDict,
}) => {
  const { candles, totalPages } = await items;
  return (
    <>
      {candles && candles.length > 0 ? (
        <ul className={styles.list}>
          {candles.map((item: DecorationDetailsI) => (
            <DecorationItemCard key={item.id} {...item} />
          ))}
          <MobilePagination
            totalPages={totalPages}
            paginBtnDict={paginBtnDict}
          />
        </ul>
      ) : null}
    </>
  );
};

export default DecorationList;
