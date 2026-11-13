export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`logo ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/picante-wordmark.png" alt="Picante" width={822} height={167} />
    </span>
  );
}
