export interface IMessage {
  id: number;
  sender: "self" | "contact";
  content: string;
  timestamp: Date;
  type: "text" | "audio" | "image" | "file" | "contact" | "video";
}

export interface IUserMessages {
  [key: number]: IMessage[];
}

const UserMessages: IUserMessages = {
  1: [
    {
      id: 1,
      sender: "contact",
      content: "Oi! Como você está?",
      timestamp: new Date("2024-12-18T10:45:00"),
      type: "text",
    },
    {
      id: 2,
      sender: "self",
      content: "Estou bem, e você?",
      timestamp: new Date("2024-12-18T10:46:00"),
      type: "text",
    },
    {
      id: 3,
      sender: "contact",
      content: "Tudo ótimo! Quais as novidades?",
      timestamp: new Date("2024-12-18T10:47:00"),
      type: "text",
    },
  ],
  2: [
    {
      id: 1,
      sender: "contact",
      content: "Vamos nos encontrar amanhã?",
      timestamp: new Date("2024-12-18T09:30:00"),
      type: "text",
    },
    {
      id: 2,
      sender: "self",
      content: "Sim! Que horas?",
      timestamp: new Date("2024-12-18T09:32:00"),
      type: "text",
    },
    {
      id: 3,
      sender: "contact",
      content: "Por volta das 14h está bom?",
      timestamp: new Date("2024-12-18T09:33:00"),
      type: "text",
    },
  ],
  3: [
    {
      id: 1,
      sender: "contact",
      content: "Pode me enviar o arquivo?",
      timestamp: new Date("2024-12-18T13:20:00"),
      type: "text",
    },
    {
      id: 2,
      sender: "self",
      content: "Enviei agora mesmo!",
      timestamp: new Date("2024-12-18T13:22:00"),
      type: "text",
    },
    {
      id: 3,
      sender: "contact",
      content: "Obrigado, recebi aqui.",
      timestamp: new Date("2024-12-18T13:25:00"),
      type: "text",
    },
  ],
  4: [
    {
      id: 1,
      sender: "contact",
      content: "Obrigado pela atualização!",
      timestamp: new Date("2024-12-18T09:10:00"),
      type: "text",
    },
    {
      id: 2,
      sender: "self",
      content: "Disponha! Qualquer coisa, é só chamar.",
      timestamp: new Date("2024-12-18T09:12:00"),
      type: "text",
    },
  ],
  5: [
    {
      id: 1,
      sender: "contact",
      content: "Feliz aniversário!",
      timestamp: new Date("2024-12-18T03:05:00"),
      type: "text",
    },
    {
      id: 2,
      sender: "self",
      content: "Muito obrigado! Fiquei feliz com sua mensagem.",
      timestamp: new Date("2024-12-18T03:10:00"),
      type: "text",
    },
  ],
  6: [
    {
      id: 1,
      sender: "contact",
      content: "Nos vemos na reunião mais tarde.",
      timestamp: new Date("2024-12-18T10:00:00"),
      type: "text",
    },
    {
      id: 2,
      sender: "self",
      content: "Combinado! Até lá.",
      timestamp: new Date("2024-12-18T10:01:00"),
      type: "text",
    },
  ],
  7: [
    {
      id: 1,
      sender: "contact",
      content: "Entendido, obrigado!",
      timestamp: new Date("2024-12-18T12:30:00"),
      type: "text",
    },
    {
      id: 2,
      sender: "self",
      content: "Por nada! Qualquer dúvida, me avise.",
      timestamp: new Date("2024-12-18T12:32:00"),
      type: "text",
    },
  ],
  8: [
    {
      id: 1,
      sender: "contact",
      content: "Gostaria de saber sua opinião sobre aquilo.",
      timestamp: new Date("2024-12-18T11:40:00"),
      type: "text",
    },
    {
      id: 2,
      sender: "self",
      content: "Acho que podemos ajustar algumas coisas.",
      timestamp: new Date("2024-12-18T11:45:00"),
      type: "text",
    },
  ],
  9: [
    {
      id: 1,
      sender: "contact",
      content: "Pode deixar que eu cuido disso.",
      timestamp: new Date("2024-12-18T16:20:00"),
      type: "text",
    },
    {
      id: 2,
      sender: "self",
      content: "Obrigado! Fico mais tranquilo agora.",
      timestamp: new Date("2024-12-18T16:25:00"),
      type: "text",
    },
  ],
  10: [
    {
      id: 1,
      sender: "contact",
      content: "Estou a caminho!",
      timestamp: new Date("2024-12-18T10:18:00"),
      type: "text",
    },
    {
      id: 2,
      sender: "self",
      content: "Perfeito, até já.",
      timestamp: new Date("2024-12-18T10:20:00"),
      type: "text",
    },
  ],
};

export default UserMessages;
