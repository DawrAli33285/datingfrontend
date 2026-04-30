export default function PattoIcon({ height = 40 }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 520 100"
        height={height}
        width={height * 5.2}
      >
        <circle cx="28" cy="50" r="28" fill="none" stroke="#6B2D3E" strokeWidth="1.5" opacity="0.55" />
        <circle cx="52" cy="50" r="28" fill="none" stroke="#6B2D3E" strokeWidth="1.5" opacity="0.55" />
        <path d="M40 24 A28 28 0 0 1 40 76 A28 28 0 0 1 40 24 Z" fill="#6B2D3E" opacity="0.14" />
        <text x="92" y="67" fontFamily="Georgia,'Times New Roman',serif" fontSize="52" fill="#6B2D3E" fontStyle="italic" fontWeight="400" letterSpacing="-1.5">patto</text>
      </svg>
    );
  }