import { notify } from "@/services/notificationService"
import { Button } from "@/components/ui/button"

export default function NotificationSettings() {

    return (
        <div className="space-y-3">

            <Button
                onClick={() =>
                    notify(
                        "Birthday Reminder",
                        "Test notification"
                    )
                }
                className="rounded-md bg-blue-600 px-4 py-2"
            >
                Send Test Notification
            </Button>

        </div>
    )
}