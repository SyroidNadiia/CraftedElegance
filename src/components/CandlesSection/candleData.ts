import img1 from '../../../public/images/candles/img-1.jpg';
import img2 from '../../../public/images/candles/img-2.jpg';
import img3 from '../../../public/images/candles/img-3.jpg';

export interface CandleI {
  id: string;
  img: string;
  title: string;
  price: string;
  link: string;
}

const candleData: CandleI[] = [
  {
    id: '1',
    img: img1.src,
    title: 'Осінь.',
    price: '370,00',
    link: '/candles',
  },
  {
    id: '2',
    img: img2.src,
    title: 'Імбир і спеції.',
    price: '355,00',
    link: '/candles',
  },
  {
    id: '3',
    img: img3.src,
    title: 'Кашемірова слива.',
    price: '355,00',
    link: '/candles',
  },
  {
    id: '4',
    img: img1.src,
    title: 'Осінь.',
    price: '370,00',
    link: '/candles',
  },
  {
    id: '5',
    img: img2.src,
    title: 'Імбир і спеції.',
    price: '355,00',
    link: '/candles',
  },
  {
    id: '6',
    img: img3.src,
    title: 'Кашемірова слива.',
    price: '355,00',
    link: '/candles',
  },
  {
    id: '7',
    img: img1.src,
    title: 'Осінь.',
    price: '370,00',
    link: '/candles',
  },
  {
    id: '8',
    img: img2.src,
    title: 'Імбир і спеції.',
    price: '355,00',
    link: '/candles',
  },
  {
    id: '9',
    img: img3.src,
    title: 'Кашемірова слива.',
    price: '355,00',
    link: '/candles',
  },
];

export default candleData;