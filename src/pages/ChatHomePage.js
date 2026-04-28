import ChatPage from '../components/ChatPage';

const questions = [
  {
    q: "How's your home routine right now — honestly?",
    opts: ['Pretty smooth, we understand each other', 'A bit chaotic, but we adapt', "There's real friction around some habits", 'Still figuring out a rhythm'],
  },
  {
    q: 'Guests and nights out — how does that work between you?',
    opts: ['Full freedom, we just keep each other posted', 'Prior agreement for overnight guests', 'Every decision is made together', 'One of us is much more social'],
  },
  {
    q: 'If a big home decision came up — moving, buying, changing cities — how would you make it?',
    opts: ['Always a joint decision, no exceptions', "Whoever's more invested financially leads", "We'd talk when it comes up", 'We want a clear process for this'],
  },
];

export default function ChatHomePage() {
  return (
    <ChatPage
    topicId="ho"
      label="Topic 3 of 3 · Home & living together"
      questions={questions}
      backRoute="/chat/fidelity"
      
    />
  );
}