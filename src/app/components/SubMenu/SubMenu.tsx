import React from 'react'
import styles from "./submenu.module.css";
import Image from 'next/image';

function SubMenu() {
  return (
    <div className={styles.submenu}>
      <div className={styles.actions}>
        <div className={styles.text}>
          Conversas
        </div>
        <div className={styles.icons}>
          <Image
            aria-hidden
            src="/new-conversation.svg"
            alt="Globe icon"
            width={24}
            height={24}
          />
          <Image
            className={styles.menu}
            aria-hidden
            src="/menu.svg"
            alt="Globe icon"
            width={24}
            height={24}
          />
        </div>
      </div>
      <div className={styles.search}>
        <button className={styles.searchButton}>
          <Image
            aria-hidden
            src="/search.svg"
            alt="Search icon"
            width={24}
            height={24}
          />
        </button>
        <input className={styles.input} placeholder="Pesquisar" type="text" />
      </div>
      <div className={styles.filter}>
        <div className={styles.filterItem}>Tudo</div>
        <div className={styles.filterItem}>Não lidas</div>
        <div className={styles.filterItem}>Favoritas</div>
        <div className={styles.filterItem}>Grupos</div>
      </div>
      <div className={styles.list}>
        <div className={styles.listItem}>
          <div className={styles.listLeft}>
            <Image
              aria-hidden
              src="/default-user.svg"
              alt="Search icon"
              width={50}
              height={50}
            />
          </div>
          <div className={styles.listRight}>
            <div className={styles.rightUp}>
              <div className={styles.UpNumber}>
                +55 11 98877 6655
              </div>
              <div className={styles.data}>
                19:20
              </div>
            </div>
            <div className={styles.message}>Tudo bem </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubMenu;
