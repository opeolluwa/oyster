export default function OysterButton({ letter }: { letter: string }) {
  return (
    <button className="rounded-sm  text-3xl sm:text-5xl border border-gray-500 size-20">
      {letter}
    </button>
  );
}
