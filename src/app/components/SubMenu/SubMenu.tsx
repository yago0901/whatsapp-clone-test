import React, { ChangeEvent, useState } from 'react'
import styles from "./submenu.module.css";
import Image from 'next/image';
import Agenda, { IContact } from '../fakers/Agenda';

interface IHeaderProps {
  setSelectedContactId: (selectedContactId: number | undefined) => void;
}
function SubMenu({ setSelectedContactId }: IHeaderProps) {

  const[filterContacts, setFilterContacts] = useState<string| undefined>(undefined);

  const filteredContacts = filterContacts
  ? Agenda.contact.filter(item =>
      item.name.toLowerCase().includes(filterContacts.toLowerCase())
    )
  : Agenda.contact;

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
        <input 
        className={styles.input} 
        placeholder="Pesquisar" 
        type="text" 
        onChange={(e:ChangeEvent<HTMLInputElement>) => setFilterContacts(e.target.value)} 
        />
      </div>
      <div className={styles.filter}>
        <div className={styles.filterItem}>Tudo</div>
        <div className={styles.filterItem}>Não lidas</div>
        <div className={styles.filterItem}>Favoritas</div>
        <div className={styles.filterItem}>Grupos</div>
      </div>
      <div className={styles.list}>
        {filteredContacts.map((contact: IContact) => {
          return (
            <div className={styles.listItem} key={contact.id} onClick={() => setSelectedContactId(contact.id)}>
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
                    {contact.name}
                  </div>
                  <div className={styles.data}>
                    {contact.time}
                  </div>
                </div>
                <div className={styles.message}>{contact.lastMessage}</div>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  )
}

export default SubMenu;
