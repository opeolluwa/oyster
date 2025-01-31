export default function OysterDescription({
  description,
}: {
  description: string;
}) {
  return (
    <div className="text-sm text-gray-600 leading-2 mt-3">
      <span className="font-medium">Hint:</span>
      {description}
    </div>
  );
}
