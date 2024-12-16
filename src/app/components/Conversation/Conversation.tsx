import React from 'react'
import styles from "./conversation.module.css";
import Image from 'next/image';

function Conversation() {
  return (
    <div className={styles.conversation}>
      <div className={styles.header}>
        <div className={styles.description}>
          <Image
            aria-hidden
            src="/default-user.svg"
            alt="Globe icon"
            width={43}
            height={43}
          />
          <div className={styles.dados}>
            <div>Contato</div>
            <div className={styles.status}>online</div>
          </div>
        </div>
        <div className={styles.actions}>
          <Image
          className={styles.camera}
            aria-hidden
            src="/video.svg"
            alt="Globe icon"
            width={20}
            height={20}
          />
          <Image
          className={styles.search}
            aria-hidden
            src="/search.svg"
            alt="Globe icon"
            width={34}
            height={34}
          />
          <Image
            aria-hidden
            src="/menu.svg"
            alt="Globe icon"
            width={28}
            height={28}
          />
        </div>
      </div>
      <div className={styles.screen}>COnversa aqui</div>
      <div className={styles.send}>
        <button className={styles.plus}>
          <Image
            aria-hidden
            src="/plus.svg"
            alt="Globe icon"
            width={28}
            height={28}
          />
        </button>
        <div className={styles.message}>
          <button className={styles.face}>
            <Image
              aria-hidden
              src="/face.svg"
              alt="Globe icon"
              width={24}
              height={24}
            />
          </button>
          <input type="text" placeholder='Digite uma mensagem' />
        </div>
        <button className={styles.plus}>
          <Image
            aria-hidden
            src="/ptt.svg"
            alt="Globe icon"
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  )
}

export default Conversation;
