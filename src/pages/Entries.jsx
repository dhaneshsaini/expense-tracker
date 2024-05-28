import { FaAngleLeft } from "react-icons/fa"
import { Link } from "react-router-dom"
import CardItem from "../components/CardItem"
import filterItemsByGranularity from "../components/functions"
import { motion } from "framer-motion"
import { Context } from "../Context"
import { useContext } from "react"

export default function Entries() {
    const { expenseList, selectedOption } = useContext(Context)

    return (
        <motion.section
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100vh", opacity: 0 }}
            className="pb-8">
            <div className="pt-8 pb-5 grid grid-cols-3 items-center">
                <Link className="col-span-1" to="/">
                    <FaAngleLeft fontSize={20} />
                </Link>
                <h2 className="col-span-2 font-semibold text-lg">Latest Entries</h2>
            </div>

            <div className="grid gap-5 mt-5">
                {filterItemsByGranularity(expenseList, selectedOption).map((e, i) => (
                    <CardItem key={i} item={e} />
                ))}
            </div>
        </motion.section>
    )
}