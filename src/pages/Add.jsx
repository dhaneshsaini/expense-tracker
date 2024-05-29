import { RxCross2 } from "react-icons/rx"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useContext, useEffect, useState } from "react"
import ItemForm from "../components/From"
import { Context } from "../Context"

export default function AddItem() {
    const navigate = useNavigate()
    const { setExpenseList } = useContext(Context)
    const [dateToday, setDateToday] = useState('')
    const options = ['Medical', 'Food', 'Shopping', 'Other']

    const [newItem, setNewItem] = useState({
        name: "",
        price: "",
        date: "",
        category: "Medical",
        id: Date.now()
    })

    useEffect(() => {
        window.scrollTo(0, 0)

        const today = new Date().toISOString().split('T')[0]
        setDateToday(today)
        setNewItem(prevState => ({ ...prevState, date: today }))
    }, [])

    useEffect(() => setExpenseList(JSON.parse(localStorage.getItem('expenses'))), [newItem])

    function handleAddNewItem(e) {
        e.preventDefault()
        // Retrieve existing expenses from localStorage
        const existingExpenses = JSON.parse(localStorage.getItem('expenses')) || []

        // Add the new item to the expenses array
        const updatedExpenses = [newItem, ...existingExpenses]

        // Save the updated expenses array back to localStorage
        localStorage.setItem('expenses', JSON.stringify(updatedExpenses))

        // Clear the form
        setNewItem({
            name: "",
            price: "",
            date: dateToday,
            category: "",
            id: Date.now()
        })

        // when form submit go to homepage
        navigate('/')
    }

    return (
        <motion.section
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}>
            <div className="">
                <Link to="/" className="flex pt-5 justify-end">
                    <RxCross2 className="bg-slate-800/20 dark:bg-white/10 rounded-full p-1" fontSize={32} />
                </Link>
            </div>
            <ItemForm
                newItem={newItem}
                setNewItem={setNewItem}
                handleAddNewItem={handleAddNewItem}
                options={options}
            />
        </motion.section>
    )
}
