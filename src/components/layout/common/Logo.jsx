import React from 'react'

function Logo() {
    return (
        <div className="p-2">
            <h1 className="font-poppins flex gap-1 font-semibold whitespace-nowrap tracking-[1px] dark:text-white text-xl sm:text-2xl">
                <span className="text-sky-400 dark:text-teal-500">{`{`}</span>
                <span >{`SH`}</span>
                <span className="text-sky-400 dark:text-teal-500">{`}`}</span>
            </h1>
        </div>
    )
}

export default Logo