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
  ],
};

export default Agenda;