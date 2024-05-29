import { FaStethoscope } from "react-icons/fa"
import { RiMoneyDollarCircleLine, RiShoppingBag4Line } from "react-icons/ri"
import { TbBowlSpoon } from "react-icons/tb"
import { Link } from "react-router-dom"
import Selector from "../components/Selector"
import { motion } from "framer-motion"
import filterItemsByGranularity, { getGreeting, totalSpending, totalSpendingByCategory } from "../components/functions"
import { useContext } from "react"
import { Context } from "../Context"
import ItemsList from "../components/List"

export default function Home() {
    const { expenseList, selectedOption, setSelectedOption } = useContext(Context)
    const options = ['Day', 'Week', 'Month', 'Year']

    console.log('rendring');

    const categories = [
        {
            name: "Medical",
            icon: FaStethoscope,
            iconColor: "#6e689c"
        },
        {
            name: "Shopping",
            icon: RiShoppingBag4Line,
            iconColor: "#c06376"
        },
        {
            name: "Food",
            icon: TbBowlSpoon,
            iconColor: "#53c0b4"
        },
        {
            name: "Other",
            icon: RiMoneyDollarCircleLine,
            iconColor: "#be8e83"
        }
    ]

    function handleSelectOption(e) {
        setSelectedOption(e)
        localStorage.setItem('selectedTimeOption', e)
    }

    return (
        <motion.section
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100vh", opacity: 0 }}
            className="max-h-screen">
            <div className="pt-8 pb-5">
                <h1 className="font-semibold text-2xl leading-loose">Good {getGreeting()}</h1>
            </div>

            <div className="flex text-slate-50 items-center p-5 rounded-xl bg-gradient-to-b from-[#ef5d4b] to-[#ef8c33] drop-shadow-xl">
                <div className="flex-1">
                    <span className="font-medium">Total Expenses</span>
                    <h2 className="text-4xl leading-relaxed font-semibold">$ {totalSpending(filterItemsByGranularity(expenseList, selectedOption)) || 0}</h2>
                </div>
                <div className="flex-1 grid place-items-center">
                    <Selector className="drop-shadow-md bg-white/20" options={options} onChange={handleSelectOption} optionFromLocalStorage={selectedOption} />
                </div>
            </div>

            <div className="mt-5">
                <div className="my-5">
                    <h2 className="font-medium">Categories</h2>
                </div>
                <div className="grid gap-5 grid-cols-2">
                    {categories.map((item, i) => (
                        <div key={i} className="bg-gradient-to-tl dark:from-[#555963] dark:to-[#40444f] rounded-xl p-5  bg-slate-100">
                            <div className="bg-gradient-to-br dark:from-[#555963] dark:to-[#40444f] inline-flex p-2 rounded-lg bg-slate-200">
                                <item.icon fontSize={24} color={item.iconColor} />
                            </div>
                            <h3 className="font-semibold text-lg leading-loose">{item.name}</h3>
                            <span className="font-medium">$ {totalSpendingByCategory(item.name, filterItemsByGranularity(expenseList, selectedOption))}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-5 mb-10">
                <div className="my-5 flex items-center justify-between">
                    <h2 className="font-medium">Latest Entries</h2>
                    <Link className="font-medium" to="/entries">View All</Link>
                </div>
                <ItemsList Length={2} />
            </div>
            <div className="sticky bottom-0 left-0 w-full py-4 border-t bg-white border-slate-200 dark:border-slate-600 dark:bg-[#303642]">
                <Link to="/add" className="p-3 drop-shadow-lg block rounded-full text-center bg-gradient-to-b text-white from-[#d6406b] to-[#eb6482] font-semibold">Add Expense</Link>
            </div>
        </motion.section>
    )
}
