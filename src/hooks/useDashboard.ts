import { useBirthdays } from "@/hooks/useBirthday"

import {
  getBirthdaySummary,
  getOldestContact,
  getYoungestContact,
  getMostCommonMonth,
} from "@/utils/birthdayUtils"
import { useAnniversaries } from "./useAnniversaries"
import { getAnniversarySummary } from "@/utils/anniversaryUtils"

export function useDashboard() {
  const {
    birthdays,
    loading,
    error,
    loadBirthdays,
  } = useBirthdays()

  const {anniversaries} = useAnniversaries()

  const anniversaryDashboardData =
    getAnniversarySummary(anniversaries)

  const birthdaydashboardData =
    getBirthdaySummary(birthdays)

  const oldestContact =
    getOldestContact(birthdays)

  const youngestContact =
    getYoungestContact(birthdays)

  const mostCommonMonth =
    getMostCommonMonth(birthdays)

  return {
    birthdays,

    loading,
    error,

    loadBirthdays,

    oldestContact,
    youngestContact,
    mostCommonMonth,

    ...birthdaydashboardData,
    ...anniversaryDashboardData,
  }
}