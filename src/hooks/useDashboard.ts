import { useBirthdays } from "@/hooks/useBirthday"

import {
  getDashboardData,
  getOldestContact,
  getYoungestContact,
  getMostCommonMonth,
} from "@/utils/dashboardUtils"

export function useDashboard() {
  const {
    birthdays,
    loading,
    error,
    loadBirthdays,
  } = useBirthdays()

  const dashboardData =
    getDashboardData(birthdays)

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

    ...dashboardData,
  }
}