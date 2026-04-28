import ChatPage from '../components/ChatPage';

const questions = [
  {
    q: "Hey Alex, hey Jordan! Let's start with money. How do you handle shared costs right now?",
    opts: ['We have a joint account', 'We split 50/50 and take turns', 'One pays, the other transfers back', "Honestly, it's a bit unclear"],
  },
  {
    q: 'Got it. Are your incomes roughly equal, or is there a noticeable gap?',
    opts: ['Pretty similar', 'One earns about 30–50% more', 'A very significant difference', 'It varies a lot — freelance or seasonal'],
  },
  {
    q: 'Last one: if one of you had a big income change, how would you want to handle the split?',
    opts: ['Adjust automatically in proportion', 'Figure it out case by case', 'Whoever can, covers the other temporarily', "We'd want a written plan for this"],
  },
];

export default function ChatMoneyPage() {
  return (
    <ChatPage
    topicId="mn"
      label="Topic 1 of 3 · Money & finances"
      questions={questions}
      backRoute="/topics"
   
    />
  );
}