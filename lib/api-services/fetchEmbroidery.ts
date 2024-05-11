import { BASE_URL } from '@components/constants';
import { EmbroideryDetailsI } from '@components/types';

export const fetchEmbroidery = async (
  lang: ServerLocale
): Promise<EmbroideryDetailsI[]> => {
  //TODO: Remove revalidate
  const response = await fetch(`${BASE_URL}/embroidery?lang=${lang}`, {
    next: { revalidate: 3600 },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch embroidery');
  }

  const data = await response.json();
  return data?._embedded?.embroidery;
};
