import { useEffect, useRef, useState } from "react"
import { FaAngleDown } from "react-icons/fa"

export default function Selector({ options, onChange, wfull = false, className, optionFromLocalStorage }) {
    const [isOpen, setIsOpen] = useState(false)

    const [selectedValue, setSelectedValue] = useState(optionFromLocalStorage || options[0])
    const dropdownRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)

        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    function handleSelect(opt) {
        setSelectedValue(opt)
        setIsOpen(false)
        onChange(opt)
    }

    return (
        <div className={`relative ${wfull ? 'w-full' : ''}`} ref={dropdownRef}>
            <div className={`flex gap-5 items-center rounded-lg px-4 py-3 cursor-pointer justify-between ${className}`} onClick={() => setIsOpen(!isOpen)}>
                {selectedValue}
                <FaAngleDown />
            </div>
            {isOpen && (
                <div className="absolute w-full drop-shadow-lg text-slate-900 rounded-lg bg-white dark:text-slate-100 dark:bg-[#40444f]">
                    {options.filter(option => option !== selectedValue)
                        .map((item, i) => (
                            <div key={i} className="flex gap-5 items-center w-full cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 py-2 px-4" onClick={() => handleSelect(item)}>
                                {item}
                            </div>
                        ))}
                </div>
            )}
        </div>
    )
}
