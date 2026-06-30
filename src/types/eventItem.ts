export interface EventItem {
    id?: number
    title: string
    date: string
    notes?: string
    type: "birthday" | "anniversary"
}