import { RxCross2 } from "react-icons/rx"
import Selector from "../components/Selector"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function AddItem() {
    const options = ['Medical', 'Food', 'Shopping', 'Other']
    const [dateToday, setDateToday] = useState('')

    const [newItem, setNewItem] = useState({
        name: "",
        price: "",
        date: "",
        category: ""
    })

    useEffect(() => {
        window.scrollTo(0, 0)

        const today = new Date().toISOString().split('T')[0]
        setDateToday(today)
        setNewItem(prevState => ({ ...prevState, date: today }))
    }, [])

    function handleAddNewItem(e) {
        e.preventDefault()

        // Retrieve existing expenses from localStorage
        const existingExpenses = JSON.parse(localStorage.getItem('expenses')) || []

        // Add the new item to the expenses array
        const updatedExpenses = [...existingExpenses, newItem]

        // Save the updated expenses array back to localStorage
        localStorage.setItem('expenses', JSON.stringify(updatedExpenses))

        // Clear the form
        setNewItem({
            name: "",
            price: "",
            date: dateToday,
            category: ""
        })
    }

    return (
        <motion.section
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            className="">
            <div className="">
                <Link to="/" className="flex pt-5 justify-end">
                    <RxCross2 className="bg-white/10 rounded-full" fontSize={32} />
                </Link>
            </div>

            <form className="flex flex-col gap-5 my-6" onSubmit={handleAddNewItem}>
                <input
                    className="outline-none border border-white/40 bg-white/20 px-5 py-3 rounded-lg"
                    type="text"
                    placeholder="Expense"
                    required
                    value={newItem.name}
                    onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
                <input
                    className="outline-none border border-white/40 bg-white/20 px-5 py-3 rounded-lg"
                    type="text"
                    placeholder="Price"
                    required
                    value={newItem.price}
                    onChange={e => setNewItem({ ...newItem, price: e.target.value })} />
                <input
                    value={newItem.date}
                    onChange={e => setNewItem({ ...newItem, date: e.target.value })}
                    className="outline-none border border-white/40 bg-white/20 px-5 py-3 rounded-lg"
                    type="date"
                    required />
                <div className="flex-1 z-10 w-full grid place-items-center">
                    <Selector
                        wfull='true'
                        options={options}
                        onChange={value => setNewItem({ ...newItem, category: value })} />
                </div>
                <input
                    className="p-4 drop-shadow-lg inline-block rounded-lg text-center w-full bg-gradient-to-b from-[#d6406b] to-[#eb6482] font-semibold cursor-pointer"
                    type="submit"
                    value="Add Item" />
            </form>
        </motion.section>
    )
}
