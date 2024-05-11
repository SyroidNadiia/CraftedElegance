import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CandleQuantity from '@components/components/shared/CandleQuantity/CandleQuantity';
import Price from '@components/components/shared/Price/Price';
import Typography from '@components/components/Typography/Typography';
import { useLangFromPathname } from '@components/hooks';
import type {
  configuratorSectionI,
  CustomCandleDescription,
  ProductDescription,
} from '@components/types';
import { useCartActionsContext, useCartContext } from '@context/CartContext';
import customCandleImg from '@images/create-your-own/custom.jpg';

import styles from './ProductCard.module.scss';

type TProperty = keyof CustomCandleDescription;

interface ProductCardProps {
  deleteButtonText: string;
  id: string;
  images: string[];
  title: string;
  description?: string | CustomCandleDescription;
  price: number;
  slug: string;
  key: string;
  descriptionPropertyNames: ProductDescription;
  itemDeletedToast: string;
  dictParam: configuratorSectionI;
  aroma?: number | IAroma;
  handleDelete: ({ id, isBox, aroma }: IHandleDeleteParams) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  images,
  title,
  price,
  description,
  slug,
  deleteButtonText,
  descriptionPropertyNames: propertyNames,
  itemDeletedToast,
  dictParam,
  aroma,
  handleDelete,
}) => {
  const { deleteCartItem } = useCartActionsContext();
  const { cartProducts, totalCartProducts } = useCartContext();
  const router = useRouter();
  const lang = useLangFromPathname();
  const isCustomCandle = slug.includes('create-your-own');
  const isCandle = slug.includes('candles');
  const isBox = slug.includes('boxes');

  const defineProductQuantity = () => {
    if (isCustomCandle) {
      return cartProducts.customCandles
        .filter(item => item.id === id)
        .reduce((acc, item) => acc + item.quantity, 0);
    }

    if (isBox) {
      return cartProducts.boxes
        .filter(item => item.id === id && item.aroma === aroma)
        .reduce((acc, item) => acc + item.quantity, 0);
    }

    if (isCandle) {
      return cartProducts.candles
        .filter(item => item.id === id)
        .reduce((acc, item) => acc + item.quantity, 0);
    }
  };

  // Extract the keys of the description object
  const descriptionKeys =
    description && typeof description === 'object' && Object.keys(description);

  const defineCartItemType = () => {
    if (isBox) return 'box';
    if (isCandle) return 'candle';
    if (isCustomCandle) return 'customCandle';
  };

  const handleRemoveCartItem = () => {
    handleDelete({
      id,
      isBox,
      aroma: typeof aroma === 'number' ? aroma : undefined,
    });
    deleteCartItem({
      id,
      type: defineCartItemType()!,
      aroma: typeof aroma === 'number' ? aroma : undefined,
      toastMessage: itemDeletedToast,
    });
    if (totalCartProducts === 1) {
      router.push(`/${lang}`);
    }
  };

  return (
    <li className={styles.card}>
      <Link href={isCustomCandle ? `${slug}` : `${slug}/${id}`}>
        <div className={styles.card__img_container}>
          <Image
            src={isCustomCandle ? customCandleImg : images[0]}
            fill
            priority
            alt={title}
            sizes="(min-width: 1230) 78px,
                    (min-width: 1024) 108px,
                    (min-width: 768px) 143px,
                    (min-width: 667px) 143px,
                    70px"
          />
        </div>
      </Link>
      <div className={styles.card__block}>
        <div className={styles.card__content}>
          <div className={styles.card__info}>
            <Link href={isCustomCandle ? `${slug}` : `${slug}/${id}`}>
              <Typography variant="bodyRegular" className={styles.card__title}>
                {title}
              </Typography>
            </Link>
            {description && typeof description === 'string' && isCandle && (
              <Typography
                variant="bodyS"
                color="var(--cl-gray-500)"
                className={styles.card__description}
              >
                {description}
              </Typography>
            )}
            {isBox && (
              <Typography
                variant="bodyS"
                color="var(--cl-gray-500)"
                className={styles.card__description}
              >
                <span>{propertyNames.aroma} - </span>
              </Typography>
            )}
            {descriptionKeys && (
              <Typography
                variant="bodyS"
                color="var(--cl-gray-500)"
                className={styles.card__description}
              >
                {/*  Loop through the keys of the description object */}
                {descriptionKeys.map((property, i) => {
                  return (
                    <span key={property}>
                      {/* Display the property name using propertyNames dictionary */}
                      {propertyNames[property as TProperty]} -{' '}
                      <span className={styles.pinkText}>
                        {/* Display the property value with pink text color */}
                      </span>
                      {/* Add a period if it's the last property, or a comma if not */}
                      {i === descriptionKeys.length - 1 ? (
                        <span>.</span>
                      ) : (
                        <span>, </span>
                      )}
                    </span>
                  );
                })}
              </Typography>
            )}
          </div>
          <Price price={price} />
        </div>
        <div className={styles.card__actions}>
          <CandleQuantity
            className={styles.buttonGroup}
            id={id}
            qty={Number(defineProductQuantity())}
            isCartQuantity
            type={defineCartItemType()}
            aroma={typeof aroma === 'number' ? aroma : undefined}
          />
          <button type="button" onClick={handleRemoveCartItem}>
            <Typography variant="bodyS" className={styles.delete}>
              {deleteButtonText}
            </Typography>
          </button>
        </div>
      </div>
    </li>
  );
};

export default ProductCard;
