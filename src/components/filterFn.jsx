export const expenseList = JSON.parse(localStorage.getItem('expenses')) || []

// total expense
export function totalSpending() {
    return expenseList.reduce((x, n) => x + Number(n.price), 0)
}

// total expense by category
export function totalSpendingByCategory(arg) {
    const filtedArr = expenseList.filter(item => item.category.toLowerCase() === arg.toLowerCase()) || []
    return filtedArr.reduce((x, n) => x + Number(n.price), 0)
}

// get week
export function getWeek() {
    const today = new Date()
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1)
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000 // milliseconds in a day
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}

const d =
    new Date(),
    [year, month, week, day] = [d.getFullYear(), d.getMonth() + 1, getWeek(), d.getDate()]

// Function to filter items by day
const filterItemsByDay = (items) => {
    return items.filter(item => {
        const itemDate = new Date(item.date)
        return itemDate.getFullYear() === year && itemDate.getMonth() === month - 1 && itemDate.getDate() === day
    })
}

// Function to filter items by week
const filterItemsByWeek = (items, weekNumber) => {
    return items.filter(item => {
        const itemDate = new Date(item.date)
        const itemYear = itemDate.getFullYear()
        const itemWeek = getWeekNumber(itemDate)

        return itemYear === year && itemWeek === weekNumber
    })
}

// Function to filter items by month
const filterItemsByMonth = (items) => {
    return items.filter(item => {
        const itemDate = new Date(item.date)
        return itemDate.getFullYear() === year && itemDate.getMonth() === month - 1
    })
}

// Function to filter items by year
const filterItemsByYear = (items) => {
    return items.filter(item => {
        const itemDate = new Date(item.date)
        return itemDate.getFullYear() === year
    })
}

// Function to get the week number for a given date
const getWeekNumber = (date) => {
    const oneJan = new Date(date.getFullYear(), 0, 1)
    const millisecsInDay = 86400000
    return Math.ceil(((date - oneJan) / millisecsInDay + oneJan.getDay() + 1) / 7)
}

// Function to filter items based on granularity (day, week, month, year)
export default function filterItemsByGranularity(items, granularity = "Day") {
    switch (granularity) {
        case 'Day':
            return filterItemsByDay(items)
        case 'Week':
            return filterItemsByWeek(items)
        case 'Month':
            return filterItemsByMonth(items)
        case 'Year':
            return filterItemsByYear(items)
        default:
            return []
    }
}