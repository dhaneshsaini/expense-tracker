import { useState, createContext } from "react"

export const Context = createContext()

export default function MyContext({ children }) {
    const [selectedOption, setSelectedOption] = useState(localStorage.getItem('selectedTimeOption') || "Day")
    const [expenseList, setExpenseList] = useState(JSON.parse(localStorage.getItem('expenses')) || [])

    return (
        <Context.Provider value={{
            expenseList,
            setExpenseList,
            selectedOption,
            setSelectedOption
        }}>
            {children}
        </Context.Provider>
    )
}