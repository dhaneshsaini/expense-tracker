import Selector from '../components/Selector';

export default function ItemForm({ newItem, setNewItem, handleAddNewItem, options }) {
    return (
        <form className="grid gap-5 my-6" onSubmit={handleAddNewItem}>
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
                pattern="^\d+(\.\d{1,2})?$"
                title="Enter a valid price (e.g., 123, 123.45, 0.99)"
                placeholder="$ Price"
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
    );
}
