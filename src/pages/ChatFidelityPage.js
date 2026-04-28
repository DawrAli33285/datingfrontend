import ChatPage from '../components/ChatPage';

const questions = [
  {
    q: 'This can feel awkward to put in writing — but naming it clearly is often a relief. How would you describe your relationship?',
    opts: ['Exclusive — just the two of us', 'Open, with agreed rules', 'Exclusive, but open to revisiting', "We'd rather not label it rigidly"],
  },
  {
    q: 'If either of you crossed a line — even unintentionally — how would you want to handle it together?',
    opts: ['A real conversation within 48 hours', 'Personal space before talking', 'Support from a therapist', 'Depends on what happened'],
  },
  {
    q: 'Is there something you feel is never said clearly enough between you?',
    opts: ['Respecting time alone', 'Boundaries with ex-partners', 'How to communicate during conflict', 'Honesty about attractions and feelings'],
  },
];

export default function ChatFidelityPage() {
  return (
    <ChatPage
    topicId="fi"
      label="Topic 2 of 3 · Fidelity & boundaries"
      questions={questions}
      backRoute="/chat/money"
   
    />
  );
}