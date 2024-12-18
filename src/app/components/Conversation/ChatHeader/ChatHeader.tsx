"use client"
import React, { useState } from 'react'
import styles from './chatheader.module.css';
import Image from 'next/image';
import { ConversationProps } from '../Conversation';
import Agenda from '../../fakers/Agenda';

function ChatHeader({ selectedContactId }: ConversationProps) {

  const [conversationMenuIsOpen, setConversationMenuIsOpen]= useState<boolean>(false);
  
  const userSelected = Agenda.contact.find(contact => contact.id === selectedContactId);

  return (
    <div className={styles.chatHeader}>
      <div className={styles.description}>
        <Image
          aria-hidden
          src="/default-user.svg"
          alt="Globe icon"
          width={43}
          height={43}
        />
        <div className={styles.dados}>
          <div>{userSelected ? (userSelected.name ? userSelected.name : userSelected.cel) : 'Contato'}</div>
          <div className={styles.status}>online</div>
        </div>
      </div>
      <div className={styles.actions}>
        <Image
          className={styles.camera}
          aria-hidden
          src="/video.svg"
          alt="Globe icon"
          width={24}
          height={24}
        />
        <Image
          className={styles.search}
          aria-hidden
          src="/search.svg"
          alt="Globe icon"
          width={34}
          height={34}
        />
        <div className={styles.conversationMenu} onClick={() => setConversationMenuIsOpen(!conversationMenuIsOpen)}>
          <Image
            aria-hidden
            src="/menu.svg"
            alt="Globe icon"
            width={28}
            height={28}
          />
          {conversationMenuIsOpen && (
            <div className={styles.conversationDropdown}>
              <div>Dados do contato</div>
              <div>Selecionar mensagens</div>
              <div>Silenciar notificações</div>
              <div>Mensagens temporárias</div>
              <div>Fechar conversa</div>
              <div>Denunciar</div>
              <div>Limpar conversa</div>
              <div>Apagar conversa</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatHeader
