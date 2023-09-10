import Image from 'next/image';
import Link from 'next/link';
import Typography from '@components/components/Typography/Typography';

import { CandleI } from '../candleData';

import styles from './CandleItemCard.module.scss';

const CandleItemCard: React.FC<CandleI> = ({ img, title, price, link }) => {
  return (
    <li className={styles.card}>
      <Link href={link}>
        <div className={styles.img_container}>
          <Image
            src={img}
            fill
            priority
            alt={title}
            sizes="(min-width: 1230) 282px,
                    (min-width: 1024) 312px,
                    (min-width: 768px) 224px,
                    (min-width: 667px) 300px,
                    154px"
          />
        </div>
        <Typography variant="bodyRegular" className={styles.title}>
          {title}
        </Typography>
      </Link>
      <div className={styles.price_container}>
        <p className={styles.price}>{price}</p>
        <span>&#8372;</span>
      </div>
    </li>
  );
};

export default CandleItemCard;