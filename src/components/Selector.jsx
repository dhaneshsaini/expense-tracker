import { useEffect, useRef, useState } from "react"
import { FaAngleDown } from "react-icons/fa"

export default function Selector({ options, onChange, wfull = false }) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState(options[0])
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
            <div className="flex gap-5 items-center rounded-lg bg-white/20 px-4 py-3 cursor-pointer drop-shadow-md justify-between" onClick={() => setIsOpen(!isOpen)}>
                {selectedValue}
                <FaAngleDown />
            </div>
            {isOpen && (
                <div className="absolute w-full drop-shadow-lg rounded-lg bg-[#40444f] px-4 py-3">
                    {options.filter(option => option !== selectedValue)
                        .map((item, i) => (
                            <div key={i} className="flex py-1 gap-5 items-center w-full cursor-pointer" onClick={() => handleSelect(item)}>
                                {item}
                            </div>
                        ))}
                </div>
            )}
        </div>
    )
}
