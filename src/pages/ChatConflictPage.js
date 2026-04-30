
import ChatPage from '../components/ChatPage';

const questions = [
  {
    q: `When tension comes up, what's your natural first move?`,
    opts: [`Talk it out right away', 'Take space, then come back', 'Tend to go quiet or shut down', 'Depends on the situation`],
  },
  {
    q: 'How do you know when something is worth bringing up vs letting go?',
    opts: [`If it bothers me twice, I say it', 'I bring up almost everything', 'I tend to let things go to keep the peace', 'We have a check-in system`],
  },
  {
    q: 'After a fight, how do you want to reconnect?',
    opts: [`A genuine apology and a hug', 'Time apart first, then normal again', 'Talk through what happened fully', 'We're still figuring this out`],
  },
];

export default function ChatConflictPage() {
  return (
    <ChatPage
    topicId="co"
      label="Topic · Conflict"
      questions={questions}
      backRoute="/chat/home"
    
    />
  );
}