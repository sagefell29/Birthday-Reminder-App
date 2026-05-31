interface Props {
    title: string
    children: React.ReactNode
}

export default function SettingsCard({
    title,
    children,
}: Props) {

    return (
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-5">

            <h2 className="mb-4 text-lg font-semibold">
                {title}
            </h2>

            {children}

        </div>
    )
}