import React from 'react'
import styles from "./header.module.css";
import Image from 'next/image';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.up}>
        <Image
          aria-hidden
          src="/convercas.svg" 
          alt="Globe icon"
          width={24}
          height={24}
        />
        <Image
          aria-hidden
          src="/status.svg" 
          alt="Globe icon"
          width={24}
          height={24}
        />
        <Image
          aria-hidden
          src="/canais.svg" 
          alt="Globe icon"
          width={24}
          height={24}
        />
        <Image
          aria-hidden
          src="/comunidades.svg" 
          alt="Globe icon"
          width={24}
          height={24}
        />
        <Image
          aria-hidden
          src="/meta-ia.png" 
          alt="Globe icon"
          width={20}
          height={20}
        />
      </div>
      <div className={styles.down}>
      <Image
          aria-hidden
          src="/config.svg" 
          alt="Globe icon"
          width={24}
          height={24}
        />
        <Image
          aria-hidden
          src="/default-user.svg" 
          alt="Globe icon"
          width={24}
          height={24}
        />
      </div>
    </header>
  )
}

export default Header;
