import { FaStethoscope } from "react-icons/fa"
import { RiMoneyDollarCircleLine, RiShoppingBag4Line } from "react-icons/ri"
import { TbBowlSpoon } from "react-icons/tb"

export default function CardItem({ item }) {
    return (
        <div className="flex justify-between items-center">
            <div className="flex-1 flex items-center gap-5">
                <div className="bg-gradient-to-br from-[#555963] to-[#40444f] inline-flex p-3 rounded-lg">
                    {item.category.toLowerCase() === "shopping" ? (<RiShoppingBag4Line fontSize={28} color="#c06376" />) : item.category.toLowerCase() === "food" ? (<TbBowlSpoon fontSize={28} color="#53c0b4" />) : item.category.toLowerCase() === "medical" ? (<FaStethoscope fontSize={28} color="#6e689c" />) : <RiMoneyDollarCircleLine fontSize={28} color="#be8e83" />}
                </div>
                <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <span className="text-sm">{item.date}</span>
                </div>
            </div>
            <div className="flex-[0.5] flex justify-end">
                <span className="font-semibold">$ {item.price}</span>
            </div>
        </div>
    )
}