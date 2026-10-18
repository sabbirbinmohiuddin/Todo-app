// import React, { useState } from 'react'

// export default function Tasbih() {
//     const [tasbih, setTasbih] = useState(0)
//     const [show, setShow] = useState(false)
//     const [showred, setShowRed] = useState(false)
//     return (
//         <>
//             <div className='bg-white shadow-2xl p-12 mx-auto w-[500px] h-60 mt-3'>

//                 <h2 className='text-center font-semibold text-blue-300 text-4xl py-3.5'>{tasbih}</h2>

//                 <div className='flex justify-center gap-3'>
//                     <button onClick={() => {
//                         setTasbih(tasbih + 1);
//                         setShow(true)
//                         setShowRed(false)

//                     }}
//                         className='p-2.5 border rounded bg-green-300'> ۞ سُبْحَانَ اللَّهِ ۞</button>
//                     <button onClick={() => {
//                         setTasbih(tasbih > 0 ? tasbih - 1 : tasbih)
//                         setShow(false)
//                         setShowRed(true)
//                     }} className='p-2.5 border rounded bg-red-300'>Decrease</button>
//                 </div>

//                 <span className={`px-2.5  bg-green-500 rounded-full ${show ? '' : 'hidden'}`}></span>
//                 <span className={` px-2.5  bg-red-500 rounded-full ${showred ? '' : 'hidden'}`}></span>


//             </div>


//         </>
//     )
// }
