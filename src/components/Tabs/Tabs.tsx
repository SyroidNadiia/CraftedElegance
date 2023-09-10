'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useWindowSize } from 'usehooks-ts';

import Container from '../Container/Container';
import Section from '../Section/Section';
import Typography from '../Typography/Typography';

import { tabsData, tabsI } from './data';

import styles from './Tabs.module.scss';

const Tabs = () => {
  const [isTabsMenuOpen, setIsTabsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { width } = useWindowSize();
  const isCurrent = (link: string) => link === pathname;
  const isSmallScreen = width < 1230;
  const isMobScreen = width < 667;

  const toggleTabsMenu = () => {
    setIsTabsMenuOpen(!isTabsMenuOpen);
  };

  return (
    <Section className={styles.section}>
      <Container className={styles.container}>
        <ul className={styles.list}>
          {isMobScreen
            ? tabsData.reduce((acc: any, item: tabsI) => {
                if (isCurrent(item.link)) {
                  acc.unshift(
                    <li
                      key={item.link}
                      className={`${styles.item} ${
                        isCurrent(item.link) ? styles.current : ''
                      }`}
                    >
                      <Link
                        href={item.link}
                        className={styles.link}
                        onClick={toggleTabsMenu}
                      >
                        <Typography
                          variant="bodyMedium"
                          color={
                            isCurrent(item.link)
                              ? 'var(--cl-gray-900)'
                              : 'var(--cl-gray-400)'
                          }
                        >
                          {item.abbreviatedTitle}
                        </Typography>
                        {!isTabsMenuOpen && (
                          <MdKeyboardArrowDown
                            style={{ width: 24, height: 24 }}
                          />
                        )}
                      </Link>
                    </li>
                  );
                } else if (isTabsMenuOpen) {
                  acc.push(
                    <li
                      key={item.link}
                      className={`${styles.item} ${
                        isCurrent(item.link) ? styles.current : ''
                      }`}
                    >
                      <Link
                        href={item.link}
                        className={styles.link}
                        onClick={toggleTabsMenu}
                      >
                        <Typography
                          variant="bodyMedium"
                          color={
                            isCurrent(item.link)
                              ? 'var(--cl-gray-900)'
                              : 'var(--cl-gray-400)'
                          }
                        >
                          {item.abbreviatedTitle}
                        </Typography>
                      </Link>
                    </li>
                  );
                }
                return acc;
              }, [])
            : tabsData.map((item: tabsI, index: number) => (
                <li
                  key={index}
                  className={`${styles.item} ${
                    isCurrent(item.link) ? styles.current : ''
                  }`}
                >
                  <Link href={item.link} className={styles.link}>
                    <Typography
                      variant="bodyMedium"
                      color={
                        isCurrent(item.link)
                          ? 'var(--cl-gray-900)'
                          : 'var(--cl-gray-400)'
                      }
                    >
                      {isSmallScreen ? item.abbreviatedTitle : item.fullTitle}
                    </Typography>
                  </Link>
                </li>
              ))}
        </ul>
      </Container>
    </Section>
  );
};

export default Tabs;