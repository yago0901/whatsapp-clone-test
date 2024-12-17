"use client";

import React, { ChangeEvent, useRef, useState } from 'react';
import styles from './conversation.module.css';
import Image from 'next/image';

interface IMessage {
  id: number;
  sender: number;
  content: string;
  timestamp: Date;
  type: 'text' | 'audio' | 'image' | 'file' | 'contact' | 'video';
}

function Conversation() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const [textMessage, setTextMessage] = useState<string>('');
  const [thread, setThread] = useState<IMessage[]>([]);

  const [modalFileSend, setModalFileSend] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const filePictureInputRef = useRef<HTMLInputElement | null>(null);

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
            sender: 1,
            content: audioUrl,
            timestamp: new Date(),
            type: 'audio',
          };
          setThread((prev) => [...prev, newMessage]);
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
        sender: 1,
        content: textMessage,
        timestamp: new Date(),
        type: 'text',
      };
      setThread((prev) => [...prev, newMessage]);
      setTextMessage('');
    }
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
        sender: 1,
        content: file.name,
        timestamp: new Date(),
        type: 'file',
      };
      setThread((prev) => [...prev, newMessage]);
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
      const fileUrl = URL.createObjectURL(file);
  
      const newMessage: IMessage = {
        id: Date.now(),
        sender: 1,
        content: fileUrl,
        timestamp: new Date(),
        type: file.type.startsWith('image/') ? 'image' : 'video',
      };
  
      setThread((prev) => [...prev, newMessage]);
      if (filePictureInputRef.current) filePictureInputRef.current.value = '';
      console.log({type: file.type.startsWith('image/') ? 'image' : 'video'})
    }
  };

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
          <Image
            aria-hidden
            src="/menu.svg"
            alt="Globe icon"
            width={28}
            height={28}
          />
        </div>
      </div>
      <div className={styles.screen}>
        {thread.map((message) => (
          <div key={message.id} className={styles.messageItem}>
            <span>
              <b>
                {{
                  text: 'Texto:',
                  file: 'Arquivo:',
                  audio: 'Áudio:',
                  image: 'Foto:',
                  video: 'Vídeo:',
                  contact: 'Contato:',
                }[message.type] || 'Outro:'}
              </b>
            </span>
            {message.type === 'text' ? (
              <p>{message.content}</p>
            ) : message.type === 'file' ? (
              <div>
                <p>Arquivo: {message.content}</p>
                <a href={message.content} download>
                  Clique para baixar
                </a>
              </div>
            ) : message.type === 'image' ? (
              <Image width={10} height={10} src={message.content} alt="Imagem enviada" className={styles.media} />
            ) : (
              <video controls className={styles.media}>
                <source src={message.content} type="video/mp4" />
                Seu navegador não suporta a reprodução de vídeo.
              </video>
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
                hidden
                onChange={handleFileChange}
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
                hidden
                accept="image/*,video/*"
                onChange={handlePictureChange}
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
