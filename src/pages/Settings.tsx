import SettingsCard from "@/components/settings/SettingsCard"

import ImportExportSection from "@/components/settings/ImportExportSection"

import NotificationSettings from "@/components/settings/NotificationSettings"

import DeveloperTools from "@/components/settings/DeveloperTools"

import { useBirthdays } from "@/hooks/useBirthday"

export default function Settings() {

    const {
        loadBirthdays,
    } = useBirthdays()

    return (
        <div className="space-y-6">

                        <section
                className="
                rounded-xl
                border
                border-neutral-800
                bg-neutral-900
                p-6
                "
            >

                <h1
                    className="
                    text-3xl
                    font-bold
                    "
                >
                    Settings
                </h1>
            
            </section>

            <SettingsCard
                title="Import / Export"
            >
                <ImportExportSection
                    reloadData={
                        loadBirthdays
                    }
                />
            </SettingsCard>

            <SettingsCard
                title="Notifications"
            >
                <NotificationSettings />
            </SettingsCard>

            <SettingsCard
                title="Developer Tools"
            >
                <DeveloperTools />
            </SettingsCard>

        </div>
    )
}