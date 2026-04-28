// ChatFuturePage.jsx
import ChatPage from '../components/ChatPage';

const questions = [
  {
    q: 'Where do you both see yourselves living in the next 5 years?',
    opts: [`Same city, no plans to move', 'Open to moving for the right opportunity', 'One of us has a strong preference', 'We haven't really talked about it`],
  },
  {
    q: 'How do you feel about having kids — or adding to your family?',
    opts: [`We both want kids', 'Neither of us wants kids', 'One of us is unsure', 'We've already decided and aligned`],
  },
  {
    q: 'If one of you got a big career opportunity that required sacrifice from the other, how would you handle it?',
    opts: [`We support each other fully, always', 'We'd weigh it together case by case', 'Career comes second to the relationship', 'We'd need a real conversation about it`],
  },
];

export default function ChatFuturePage() {
  return (
    <ChatPage
    topicId="fu"
      label="Topic · Future"
      questions={questions}
      backRoute="/chat/home"
 
    />
  );
}