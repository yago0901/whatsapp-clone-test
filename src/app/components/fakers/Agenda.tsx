import UserMessages from './Conversations';

export interface IContact {
  id: number;
  name: string;
  cel: number;
  lastMessage: string;
  time: string;
}

export interface IAgenda {
  contact: IContact[];
}

const Agenda: IAgenda = {
  contact: [
    {
      id: 1,
      name: "John Doe",
      cel: 123456789,
      lastMessage: "Hey! How's it going?",
      time: "10:45",
    },
    {
      id: 2,
      name: "Jane Smith",
      cel: 987654321,
      lastMessage: "Let's catch up tomorrow!",
      time: "9:30",
    },
    {
      id: 3,
      name: "Michael Johnson",
      cel: 555123456,
      lastMessage: "Can you send me the file?",
      time: "13:20",
    },
    {
      id: 4,
      name: "Emily Davis",
      cel: 444987654,
      lastMessage: "Thanks for the update!",
      time: "09:10",
    },
    {
      id: 5,
      name: "Chris Brown",
      cel: 333678901,
      lastMessage: "Happy Birthday!",
      time: "03:05",
    },
    {
      id: 6,
      name: "Sophia Wilson",
      cel: 222345678,
      lastMessage: "See you at the meeting.",
      time: "10:00",
    },
    {
      id: 7,
      name: "David Martinez",
      cel: 777654321,
      lastMessage: "Got it, thanks!",
      time: "12:30",
    },
    {
      id: 8,
      name: "Olivia Hernandez",
      cel: 888987654,
      lastMessage: "Let me know your thoughts.",
      time: "11:40",
    },
    {
      id: 9,
      name: "Daniel Lee",
      cel: 999123789,
      lastMessage: "Sure, I’ll take care of it.",
      time: "16:20",
    },
    {
      id: 10,
      name: "Ava Clark",
      cel: 111234567,
      lastMessage: "On my way!",
      time: "10:18",
    },
    {
      id: 11,
      name: "Lucas Miller",
      cel: 123987654,
      lastMessage: "How’s everything going?",
      time: "14:50",
    },
    {
      id: 12,
      name: "Mia Davis",
      cel: 222654321,
      lastMessage: "Let’s meet for lunch soon!",
      time: "12:00",
    },
    {
      id: 13,
      name: "Ethan Taylor",
      cel: 333876543,
      lastMessage: "Got your email, will reply later.",
      time: "15:40",
    },
    {
      id: 14,
      name: "Isabella Brown",
      cel: 444321765,
      lastMessage: "Thanks for the information.",
      time: "17:00",
    },
    {
      id: 15,
      name: "James Wilson",
      cel: 555765432,
      lastMessage: "Can you call me back?",
      time: "18:10",
    },
    {
      id: 16,
      name: "Charlotte Moore",
      cel: 666543210,
      lastMessage: "I’ll be there in 30 minutes.",
      time: "19:15",
    },
    {
      id: 17,
      name: "Amelia Jackson",
      cel: 777234567,
      lastMessage: "Just got the update, thanks!",
      time: "08:50",
    },
    {
      id: 18,
      name: "Benjamin Lewis",
      cel: 888765432,
      lastMessage: "Can you send me the report?",
      time: "11:00",
    },
    {
      id: 19,
      name: "Lily Clark",
      cel: 999876543,
      lastMessage: "I’ll check it out and get back to you.",
      time: "13:25",
    },
    {
      id: 20,
      name: "Oliver Martinez",
      cel: 101234567,
      lastMessage: "Looking forward to our meeting!",
      time: "17:35",
    },
  ],
};

Agenda.contact = Agenda.contact.map(contact => {
  const lastMessageObj = UserMessages[contact.id]?.slice(-1)[0]; 
  if (lastMessageObj) {
    contact.lastMessage = lastMessageObj.content; 
  }
  return contact;
});

export default Agenda;
