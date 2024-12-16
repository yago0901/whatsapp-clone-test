"use client";

import React, { ChangeEvent, useRef, useState } from 'react'
import styles from "./conversation.module.css";
import Image from 'next/image';

function Conversation() {

  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const [message, setMessage] = useState<string>('');

  const [modalFileSend, seModalFileSend] = useState<boolean>(false);

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
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
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
        {audioUrl && (
          <div>
            <audio controls src={audioUrl} />
          </div>
        )}
      </div>
      <div className={styles.send}>
        <button className={styles.plus}>
          <Image
            aria-hidden
            src="/plus.svg"
            alt="Globe icon"
            width={28}
            height={28}
            onClick={() => seModalFileSend(!modalFileSend)}
          />
          {modalFileSend &&
            <div className={styles.modalFileSend}>
              <div className={styles.documents}>
                <Image
                  aria-hidden
                  src="/document.svg"
                  alt="Globe icon"
                  width={18}
                  height={18}
                />
                <p className={styles.title}>Documentos</p>
              </div>
              <div className={styles.pictures}>
                <Image
                  aria-hidden
                  src="/picture.svg"
                  alt="Globe icon"
                  width={18}
                  height={18}
                />
                <p className={styles.title}>Fotos e vídeos</p>
              </div>
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
          }
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
            type="text"
            placeholder='Digite uma mensagem'
            value={message}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
          />
        </div>
        <button
          className={styles.plus}
          onClick={handleToggleRecording}
        >
          {isRecording ? (
            <Image
              aria-hidden
              src="/send.svg"
              alt="Stop recording"
              width={24}
              height={24}
            />
          ) : message.length > 0 ? (
            <Image
              aria-hidden
              src="/send.svg"
              alt="Globe icon"
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
  )
}

export default Conversation;
