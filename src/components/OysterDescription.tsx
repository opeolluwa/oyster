export default function OysterDescription({
  description,
}: {
  description: string;
}) {
  return (
    <div className="text-sm text-gray-600 leading-loose mt-3 italic">
      <span className="font-medium">Hint:</span>
      {description}
    </div>
  );
}
