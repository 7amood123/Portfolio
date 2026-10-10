export function SectionHeading({
  index,
  id,
  title,
  subtitle,
}: {
  index: string
  id: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet">{index}</p>
      <h2 id={id} className="mt-3 text-4xl text-balance sm:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-lg leading-relaxed text-pretty text-muted">{subtitle}</p>
      ) : null}
    </div>
  )
}
