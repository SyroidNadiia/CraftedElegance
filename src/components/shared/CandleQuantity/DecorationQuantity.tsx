'use client';
import React, { Dispatch, SetStateAction } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import Typography from '@components/components/Typography/Typography';
import { useCartActionsContext } from '@context/CartContext';

import styles from './DecorationQuantity.module.scss';

interface DecorationQuantityProps {
  className?: string;
  isCartQuantity?: boolean;
  id?: string;
  qty?: number;
  setQuantity?: Dispatch<SetStateAction<number>>;
  type?: 'decorations' | 'embroidery';
}

const CandleQuantity: React.FC<DecorationQuantityProps> = ({
  className,
  isCartQuantity,
  id,
  qty,
  setQuantity,
  type,
}) => {
  const { toggleQuantity } = useCartActionsContext();

  const handleIncrement = () => {
    setQuantity && qty && setQuantity(qty + 1);
  };

  const handleDecrement = () => {
    if (qty && qty > 1) {
      setQuantity && setQuantity(qty - 1);
    }
  };

  return (
    <div className={`${styles.buttonGroup} ${className || ''}`}>
      {isCartQuantity ? (
        <>
          {' '}
          <button
            onClick={() =>
              id && type && toggleQuantity({ id, value: 'dec', type })
            }
            className={styles.candleCount}
          >
            <FiMinus />
          </button>
          <Typography variant="button" color="var(--cl-primary-900)">
            {qty}
          </Typography>
          <button
            onClick={() =>
              id && type && toggleQuantity({ id, value: 'inc', type })
            }
            className={styles.candleCount}
          >
            <FiPlus />
          </button>
        </>
      ) : (
        <>
          {' '}
          <button onClick={handleDecrement} className={styles.candleCount}>
            <FiMinus />
          </button>
          <Typography variant="button" color="var(--cl-primary-900)">
            {qty}
          </Typography>
          <button onClick={handleIncrement} className={styles.candleCount}>
            <FiPlus />
          </button>
        </>
      )}
    </div>
  );
};

export default CandleQuantity;
