import { useBirthdays } from "@/hooks/useBirthday"

import {
  getBirthdayStats,
  getOldestContact,
  getYoungestContact
} from "@/utils/birthdayUtils"
import { useAnniversaries } from "./useAnniversaries"
import { getAnniversaryStats } from "@/utils/anniversaryUtils"
import {
  combineEvents,
  getMostCommonEventMonth,
  getTodaysEvents,
  getTotalEvents,
  getUpcomingEvents
} from "@/utils/eventUtils"

export function useDashboard() {
  const {
    birthdays,
    loading,
    error,
    loadBirthdays,
  } = useBirthdays()

  const { anniversaries } = useAnniversaries()

  const events = combineEvents(birthdays, anniversaries)

  const totalEvents =
    getTotalEvents(events)

  const mostCommonEventMonth =
    getMostCommonEventMonth(events)

  const todaysEvents =
    getTodaysEvents(events)

  const upcomingEventsThisWeek =
    getUpcomingEvents(events, 7)

  const upcomingEventsThisMonth =
    getUpcomingEvents(events, 30)

  const anniversaryStats =
    getAnniversaryStats(anniversaries)

  const birthdayStats =
    getBirthdayStats(birthdays)

  const oldestContact =
    getOldestContact(birthdays)

  const youngestContact =
    getYoungestContact(birthdays)

  return {

    loading,
    error,

    loadBirthdays,

    birthdays,
    anniversaries,

    events,

    totalEvents,

    todaysEvents,

    upcomingEventsThisWeek,

    upcomingEventsThisMonth,

    oldestContact,
    youngestContact,
    mostCommonEventMonth,

    ...birthdayStats,

    ...anniversaryStats,
  }
}