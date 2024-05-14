import type { DecorationDetailsI } from '../../../types';
import MobilePagination from '../../shared/MobilePagination/MobilePagination';
import DecorationItemCard from '../DecorationItemCard/DecorationItemCard';

import styles from './DecorationList.module.scss';

interface DecorationListProps {
  items: Promise<DecorationsApiResponse>;
  paginBtnDict: string;
}

const DecorationList: React.FC<DecorationListProps> = async ({
  items,
  paginBtnDict,
}) => {
  const { decorations } = await items;

  return (
    <ul className={styles.list}>
      {decorations.map((item: DecorationDetailsI) => (
        <DecorationItemCard key={item.id} {...item} />
      ))}
    </ul>
  );
};
      

export default DecorationList;
