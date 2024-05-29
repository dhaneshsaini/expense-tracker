import { useContext, useMemo } from "react";
import filterItemsByGranularity, { rearrangeByDate } from "./functions";
import { Context } from "../Context";
import CardItem from "./CardItem";

export default function ItemsList({ Length }) {
    const { expenseList, selectedOption } = useContext(Context)

    const filteredAndSortedExpenses = useMemo(() => {
        const filteredItems = filterItemsByGranularity(expenseList, selectedOption);
        return rearrangeByDate(filteredItems)
    }, [expenseList, selectedOption])

    const list = Length ? filteredAndSortedExpenses.slice(0, Length) : filteredAndSortedExpenses

    return (
        <div className="grid gap-5 mt-5">
            {list.map((e, i) => <CardItem key={i} item={e} />)}
        </div>
    )
}