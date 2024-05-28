import { RxCross2 } from "react-icons/rx"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import ItemForm from "../components/From"

export default function EditItem() {
    const options = ['Medical', 'Food', 'Shopping', 'Other']
    const [dateToday, setDateToday] = useState('')
    const navigate = useNavigate()

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

        navigate('/')
    }

    return (
        <motion.section
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}>
            <div className="">
                <Link to="/" className="flex pt-5 justify-end">
                    <RxCross2 className="bg-white/10 rounded-full p-1" fontSize={32} />
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
