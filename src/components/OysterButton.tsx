export interface OysterButtonInterface {
  letter: string;
}
export default function OysterButton({ letter }: OysterButtonInterface) {
  return (
    <button className="rounded-sm mx-2 shadow block hover:text-white hover:bg-purple-500/50 transition-all delay-75  text-3xl md:text-5xl border border-purple-500/50 size-20">
      {letter}
    </button>
  );
}
