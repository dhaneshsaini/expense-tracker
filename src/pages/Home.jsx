import { FaStethoscope } from "react-icons/fa"
import { RiMoneyDollarCircleLine, RiShoppingBag4Line } from "react-icons/ri"
import { TbBowlSpoon } from "react-icons/tb"
import { Link } from "react-router-dom"
import Selector from "../components/Selector"
import CardItem from "../components/CardItem"
import { motion } from "framer-motion"
import filterItemsByGranularity, { expenseList, totalSpending, totalSpendingByCategory } from "../components/filterFn"
import { useContext } from "react"
import { Context } from "../main"

export default function Home() {
    const { selectedOption, setSelectedOption } = useContext(Context)
    const options = ['Day', 'Week', 'Month', 'Year']

    const categories = [
        {
            name: "Medical",
            icon: FaStethoscope,
            expense: totalSpendingByCategory('Medical'),
            iconColor: "#6e689c"
        },
        {
            name: "Shopping",
            icon: RiShoppingBag4Line,
            expense: totalSpendingByCategory('Shopping'),
            iconColor: "#c06376"
        },
        {
            name: "Food",
            icon: TbBowlSpoon,
            expense: totalSpendingByCategory('Food'),
            iconColor: "#53c0b4"
        },
        {
            name: "Other",
            icon: RiMoneyDollarCircleLine,
            expense: totalSpendingByCategory('Others'),
            iconColor: "#be8e83"
        }
    ]

    return (
        <>
            <motion.section
                initial={{ y: "100vh", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100vh", opacity: 0 }}
                className="overflow-y-auto">
                <div className="pt-8 pb-5">
                    <h1 className="font-semibold text-2xl leading-loose">Hello, Dhanesh</h1>
                </div>

                <div className="flex items-center p-5 rounded-xl bg-gradient-to-b from-[#ef5d4b] to-[#ef8c33] drop-shadow-xl">
                    <div className="flex-1">
                        <span className="font-medium">Total Expenses</span>
                        <h2 className="text-4xl leading-relaxed font-semibold">$ {totalSpending() || 0}</h2>
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
                                <span className="font-medium">$ {item.expense}</span>
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
                        {filterItemsByGranularity(expenseList, selectedOption).slice(0, 4).map((e, i) => (
                            <CardItem key={i} item={e} />
                        ))}
                    </div>
                </div>
            </motion.section>
            <div className="p-4 border-t border-gray-600 sticky top-full left-0 w-full bg-[#303642]">
                <Link to="/additem" className="p-4 drop-shadow-lg inline-block rounded-full text-center w-full bg-gradient-to-b from-[#d6406b] to-[#eb6482] font-semibold">Add Expense</Link>
            </div>
        </>
    )
}
