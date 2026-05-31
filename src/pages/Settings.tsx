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

            <SettingsCard
                title="Import / Export"
            >
                <ImportExportSection
                    reloadBirthdays={
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