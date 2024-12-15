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
        <div className={styles.actions}>Actions</div>
      </div>
      <div className={styles.screen}>COnversa aqui</div>
      <div className={styles.send}>
        <button>+</button>
        <div className={styles.message}>
          <button>Rostinho</button>
          <input type="text" placeholder='Digite uma mensagem' />
        </div>
        <button>Microfone</button>
      </div>
    </div>
  )
}

export default Conversation;
