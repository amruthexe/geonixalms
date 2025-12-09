export default function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <img 
      src="https://www.geonixa.com/_next/image?url=%2Fgeonixa.png&w=48&q=75" 
      alt="Geonixa Logo" 
      className={`object-contain ${className}`}
    />
  );
}
