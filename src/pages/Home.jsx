import { FaStethoscope } from "react-icons/fa"
import { RiMoneyDollarCircleLine, RiShoppingBag4Line } from "react-icons/ri"
import { TbBowlSpoon } from "react-icons/tb"
import { Link } from "react-router-dom"
import Selector from "../components/Selector"
import CardItem from "../components/CardItem"
import { motion } from "framer-motion"
import filterItemsByGranularity, { getGreeting, totalSpending, totalSpendingByCategory } from "../components/functions"
import { useContext } from "react"
import { Context } from "../Context"

export default function Home() {
    const { expenseList, selectedOption, setSelectedOption } = useContext(Context)
    const options = ['Day', 'Week', 'Month', 'Year']

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

    return (
        <>
            <motion.section
                initial={{ y: "100vh", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100vh", opacity: 0 }}
                className="min-h-screen">
                <div className="pt-8 pb-5">
                    <h1 className="font-semibold text-2xl leading-loose">Good {getGreeting()}</h1>
                </div>

                <div className="flex items-center p-5 rounded-xl bg-gradient-to-b from-[#ef5d4b] to-[#ef8c33] drop-shadow-xl">
                    <div className="flex-1">
                        <span className="font-medium">Total Expenses</span>
                        <h2 className="text-4xl leading-relaxed font-semibold">$ {totalSpending(filterItemsByGranularity(expenseList, selectedOption)) || 0}</h2>
                    </div>
                    <div className="flex-1 grid place-items-center">
                        <Selector options={options} onChange={e => setSelectedOption(e)} />
                    </div>
                </div>

                <div className="mt-5">
                    <div className="my-5">
                        <h2 className="font-medium">Categories</h2>
                    </div>
                    <div className="grid gap-5 grid-cols-2">
                        {categories.map((item, i) => (
                            <div key={i} className="bg-gradient-to-tl from-[#555963] to-[#40444f] rounded-xl p-5">
                                <div className="bg-gradient-to-br from-[#555963] to-[#40444f] inline-flex p-2 rounded-lg">
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
                    <div className="grid gap-5 mt-5">
                        {filterItemsByGranularity(expenseList, selectedOption).slice(0, 3).map((e, i) => (
                            <CardItem key={i} item={e} />
                        ))}
                    </div>
                </div>

                <div className="p-4 border-t border-gray-600 sticky top-full left-0 w-full bg-[#303642]">
                    <Link to="/add" className="p-4 drop-shadow-lg inline-block rounded-full text-center w-full bg-gradient-to-b from-[#d6406b] to-[#eb6482] font-semibold">Add Expense</Link>
                </div>
            </motion.section>
        </>
    )
}
