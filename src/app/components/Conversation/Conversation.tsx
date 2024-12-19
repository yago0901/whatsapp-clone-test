"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './conversation.module.css';
import Image from 'next/image';
import ChatHeader from './ChatHeader/ChatHeader';
import UserMessages, { IMessage } from '../fakers/Conversations';
import Agenda from '../fakers/Agenda';

export interface ConversationProps {
  selectedContactId: number | undefined;
}

function Conversation({ selectedContactId }: ConversationProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const [textMessage, setTextMessage] = useState<string>('');

  const [modalFileSend, setModalFileSend] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const filePictureInputRef = useRef<HTMLInputElement | null>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredMessageId, setHoveredMessageId] = useState<number | undefined>(undefined);
  const [idDropdownOpen, setIdDropdownOpen] = useState<number | undefined>(undefined);

  const handleMouseEnter = (id: number) => {
    setHoveredMessageId(id);
  };

  const handleMouseLeave = () => {
    if (isDropdownOpen === false) {
      setHoveredMessageId(undefined);
    }
  };

  const userMessages = selectedContactId !== undefined ? UserMessages[selectedContactId] : undefined;

  useEffect(() => {
    Agenda.contact = Agenda.contact.map(contact => {
      const lastMessageObj = UserMessages[contact.id]?.slice(-1)[0];
      if (lastMessageObj) {
        contact.lastMessage = lastMessageObj.content;
      }
      return contact;
    });

  }, [Agenda.contact, UserMessages]);

  const handleToggleRecording = async () => {
    if (isRecording) {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        audioChunksRef.current = [];
        mediaRecorder.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioUrl(audioUrl);

          const newMessage: IMessage = {
            id: Date.now(),
            sender: 'self',
            content: audioUrl,
            timestamp: new Date(),
            type: 'audio',
          };

          if (selectedContactId !== undefined) {
            UserMessages[selectedContactId].push(newMessage);
          }
          setAudioUrl(null);
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    }
  };

  const handleSendMessage = () => {
    if (textMessage.trim() !== '') {
      const newMessage: IMessage = {
        id: Date.now(),
        sender: 'self',
        content: textMessage,
        timestamp: new Date(),
        type: 'text',
      };
      if (selectedContactId !== undefined) {
        UserMessages[selectedContactId].push(newMessage);
      }
      setAudioUrl(null);
      setTextMessage('');
    }

    Agenda.contact = Agenda.contact.map(contact => {
      const lastMessageObj = UserMessages[contact.id]?.slice(-1)[0];
      if (lastMessageObj) {
        contact.lastMessage = lastMessageObj.content;
      }
      return contact;
    });
  };

  const handleSends = () => {
    if (textMessage.length > 0 && audioUrl === null) {
      handleSendMessage();
    } else {
      handleToggleRecording();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newMessage: IMessage = {
        id: Date.now(),
        sender: "self",
        content: file.name,
        timestamp: new Date(),
        type: 'file',
      };
      if (selectedContactId !== undefined) {
        UserMessages[selectedContactId].push(newMessage);
      }
    }
  };

  const handleDocumentsClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePictureClick = () => {
    if (filePictureInputRef.current) {
      filePictureInputRef.current.click();
    }
  };

  const handlePictureChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'video/mp4'];
      if (!validTypes.includes(file.type)) {
        alert('Formato de arquivo não suportado.');
        return;
      }

      const fileUrl = URL.createObjectURL(file);
      const newMessage: IMessage = {
        id: Date.now(),
        sender: "self",
        content: fileUrl,
        timestamp: new Date(),
        type: file.type.startsWith('image/') ? 'image' : 'video',
      };

      if (selectedContactId !== undefined) {
        UserMessages[selectedContactId].push(newMessage);
      }
    }
  };


  return (
    <div className={styles.conversation}>
      <ChatHeader selectedContactId={selectedContactId} />
      <div className={styles.screen}>
        {userMessages?.map((message) => (
          <div
            key={message.id}
            className={`${styles.messageItem} ${message.sender === 'self' ? styles['messageItem--self'] : ''
              }`}
          >
            {message.type === 'text' ? (
              <div
                className={`${styles.displayMessage} ${message.sender === 'self' ? styles['displayMessage--self'] : ''
                  }`}
                onMouseEnter={() => handleMouseEnter(message.id)}
                onMouseLeave={handleMouseLeave}
              >
                <p>{message.content}</p>
                {hoveredMessageId === message.id &&
                  <div className={styles.individualMenu}>
                    <div
                      className={styles.baseDropdown}
                      onClick={() => { setIsDropdownOpen(!isDropdownOpen); setIdDropdownOpen(message.id) }}
                    >
                      <Image
                        aria-hidden
                        src="/down-arrow.svg"
                        alt="Globe icon"
                        width={8}
                        height={8}
                      />
                    </div>
                    {isDropdownOpen && idDropdownOpen === message.id &&
                      <div className={styles.singleDropdown}>
                        <div className={styles.dropdownItem}>Responder</div>
                        <div className={styles.dropdownItem}>Reagir</div>
                        <div className={styles.dropdownItem}>Encaminhar</div>
                        <div className={styles.dropdownItem}>Fixar</div>
                        <div className={styles.dropdownItem}>Favoritar</div>
                        <div className={styles.dropdownItem}>Denunciar</div>
                        <div className={styles.dropdownItem}>Apagar</div>
                      </div>
                    }
                  </div>}
              </div>
            ) : message.type === 'file' ? (
              <div
                className={`${styles.displayMessage} ${message.sender === 'self' ? styles['displayMessage--self'] : ''
                  }`}>
                <p>Arquivo: {message.content}</p>
                <a href={message.content} download>
                  Clique para baixar
                </a>
              </div>
            ) : message.type === 'image' ? (
              <div
                className={`${styles.displayMessageImage} ${message.sender === 'self' ? styles['displayMessageImage--self'] : ''
                  }`}>
                <Image width={10} height={10} src={message.content} alt="Imagem enviada" className={styles.media} />
              </div>
            ) : (
              <div className={`${styles.displayMessageImage} ${message.sender === 'self' ? styles['displayMessageImage--self'] : ''
                }`}>
                <video controls className={styles.media}>
                  <source src={message.content} type="video/mp4" />
                  Seu navegador não suporta a reprodução de vídeo.
                </video>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={styles.send}>
        <button className={styles.plus}>
          <Image
            aria-hidden
            src="/plus.svg"
            alt="Globe icon"
            width={28}
            height={28}
            onClick={() => setModalFileSend(!modalFileSend)}
          />
          {modalFileSend && (
            <div className={styles.modalFileSend}>
              <div className={styles.documents} onClick={handleDocumentsClick}>
                <Image
                  aria-hidden
                  src="/document.svg"
                  alt="Globe icon"
                  width={18}
                  height={18}
                />
                <p className={styles.title}>Documentos</p>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <div className={styles.pictures} onClick={handlePictureClick}>
                <Image
                  aria-hidden
                  src="/picture.svg"
                  alt="Globe icon"
                  width={18}
                  height={18}
                />
                <p className={styles.title}>Fotos e vídeos</p>
              </div>
              <input
                type="file"
                ref={filePictureInputRef}
                onChange={handlePictureChange}
                accept="image/*,video/*"
                style={{ display: "none" }}
              />
              <div className={styles.cam}>
                <Image
                  aria-hidden
                  src="/cam.svg"
                  alt="Globe icon"
                  width={18}
                  height={18}
                />
                <p className={styles.title}>Câmera</p>
              </div>
              <div className={styles.contact}>
                <Image
                  aria-hidden
                  src="/contact.svg"
                  alt="Globe icon"
                  width={18}
                  height={18}
                />
                <p className={styles.title}>Contato</p>
              </div>
            </div>
          )}
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
          <input
            className={styles.input}
            type="text"
            placeholder="Digite uma mensagem"
            value={textMessage}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTextMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && textMessage.trim() !== '') {
                handleSendMessage();
                setTextMessage('');
              }
            }}
          />
        </div>
        <button
          className={styles.plus}
          onClick={handleSends}
        >
          {isRecording ? (
            <Image
              aria-hidden
              src="/send.svg"
              alt="Stop recording"
              width={24}
              height={24}
            />
          ) : textMessage.length > 0 ? (
            <Image
              aria-hidden
              src="/send.svg"
              alt="Send text"
              width={24}
              height={24}
            />
          ) : (
            <Image
              aria-hidden
              src="/ptt.svg"
              alt="Globe icon"
              width={24}
              height={24}
            />
          )}
        </button>
      </div>
    </div>
  );
}

export default Conversation;
