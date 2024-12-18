'use client'

import { useState } from 'react';
import Conversation from './components/Conversation/Conversation';
import Header from './components/Header/Header';
import SubMenu from './components/SubMenu/SubMenu';
import styles from "./page.module.css";

export default function Home() {

  const [selectedContactId, setSelectedContactId] = useState<number | undefined>(undefined);

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.up}></div>
        <div className={styles.down}></div>
      </div>
      <div className={styles.content}>
        <Header />
        <SubMenu setSelectedContactId={setSelectedContactId}/>
        <Conversation selectedContactId={selectedContactId}/>
      </div>
    </div>
  );
}
