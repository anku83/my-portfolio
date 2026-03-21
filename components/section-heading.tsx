import clsx from "clsx";

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left"
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={clsx("relative z-10", align === "center" && "mx-auto text-center")} data-animate>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {copy ? <p className="section-copy">{copy}</p> : null}
      <div className={clsx("gold-line mt-8 h-px w-36", align === "center" && "mx-auto")} />
    </div>
  );
}
