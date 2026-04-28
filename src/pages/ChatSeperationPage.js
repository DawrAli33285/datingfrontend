// ChatSeparationPage.jsx
import ChatPage from '../components/ChatPage';

const questions = [
  {
    q: 'Is it important to you to have something in writing if things end?',
    opts: [`Yes, clarity protects both of us', 'It feels uncomfortable but probably smart', 'Not really — we'd figure it out', 'We already have something in place`],
  },
  {
    q: 'If you separated, how would you want to handle shared finances or property?',
    opts: [`Split everything equally', 'Based on who contributed what', 'Handled by a mediator or lawyer', 'We'd decide when the time comes`],
  },
  {
    q: 'How do you want to treat each other if the relationship ends?',
    opts: ['With full respect and no blame', 'Civilly, but distance is okay', 'Depends on how it ends', 'We want a mutual agreement on this now'],
  },
];

export default function ChatSeparationPage() {
  return (
    <ChatPage
    topicId="se"
      label="Topic · Separation"
      questions={questions}
      backRoute="/chat/home"
      
    />
  );
}