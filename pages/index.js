// pages/index.js

"use client";

import { useState } from 'react'
import styles from './page.module.css';

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
 
  
export default function Home() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchedNumber, setSearchedNumber] = useState('');

  const handleTokenSearch = async () => {
    if (!searchedNumber || searchedNumber < 1 || searchedNumber > 888) {
      alert('Please enter a valid number between 1 and 888');
      return;
    }
    router.push(`/token/${searchedNumber}`);
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleTokenSearch();
    }
  };

  return (
    <div className={styles.container}>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""></link>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://use.typekit.net/xjs6syn.css"></link>
      <nav className={styles.nav}>
      <div className={styles.navDiv}> <a href="/">ANOMALYCHECKER.APP</a> </div>
    </nav>
    <h1 className={styles.title}>Explore  ANOMALY A.I. <br></br> by Star IM</h1>
      <div className={styles.searchContainer}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={searchedNumber}
          onChange={(e) => setSearchedNumber(e.target.value)}
          onKeyDown={handleEnterKeyPress}
          placeholder="Enter set number [001, 010, 100] "
          className={styles.inputField}
          min="1"
          max="888"
        />
        <button onClick={handleTokenSearch} className={styles.searchButton}>
        ➔
        </button>
      </div>
      </div>
      <div className={styles.footer}>
        <p>Developed by <a href='https://twitter.com/fxru_eth' target="_blank">@fxru_eth</a>. Like the AnomalyChecker? Any donations to help me fund my new MacBook are welcome &rarr; ferdinandveci.eth</p>
      </div>
    </div>
  );
};



