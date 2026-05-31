interface Props {
  title: string
  value: string | number
}

export default function StatsCard({
  title,
  value,
}: Props) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
      <p className="text-sm text-neutral-400">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>
    </div>
  )
}