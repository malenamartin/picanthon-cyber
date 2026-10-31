export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`logo ${className}`} aria-label="Picante">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="logo-chili"
        src="/picante-chili.png"
        alt=""
        width={338}
        height={336}
      />
      Picante
    </span>
  );
}
