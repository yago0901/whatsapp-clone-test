import React from 'react'
import styles from "./submenu.module.css";

function SubMenu() {
  return (
    <div className={styles.submenu}>
      <div className={styles.actions}>
        <div className={styles.text}>
        Conversas
        </div>        
        <div className={styles.icons}>
          teste
        </div>
      </div>
      <div className={styles.search}>
        Search
      </div>
      <div className={styles.filter}>
        Filter
      </div>
      <div className={styles.list}>
        Lista
      </div>
    </div>
  )
}

export default SubMenu;
