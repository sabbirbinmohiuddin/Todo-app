


// import Tasbih from './Tasbih'
import Todolist from './Todolist'




export default function App() {
  return (
    <div>
      {/* <Tasbih /> */}


      <Todolist />

    </div>
  )
}






























// import { useState } from "react"
// import { ToastContainer, toast } from 'react-toastify';
// // import Todolist from "./Todolist";


// export default function App() {
//   const [count, setCount] = useState(0)
//   const [show, setShow] = useState(false)
//   const [showred, setShowRed] = useState(false)
//   const notify = () => toast("Please increment before & then reset!");

//   return (
//     <>

//       <div className="flex items-start justify-center bg-gray-100">
//         <div className="rounded-2xl bg-gray-400 my-20 p-8 text-center shadow-lg">
//           <h1 className="mb-6 text-2xl font-bold text-gray-800">
//             Counter App
//           </h1>
//           <span className={`px-2.5  bg-green-700 rounded-full ${show ? '' : 'hidden'}`}></span>
//           <span className={` px-2.5  bg-red-500 rounded-full ${showred ? '' : 'hidden'}`}></span>


//           <p className="mb-6 text-5xl font-bold text-blue-600">
//             {count}
//           </p>

//           <div className="flex items-center justify-center gap-4">
//             <button
//               onClick={() => {
//                 setCount(count + 1);
//                 setShow(true)
//                 setShowRed(false)
//               }}

//               className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 active:scale-95"
//             >
//               Increment +
//             </button>

//             <button
//               onClick={() => {
//                 setCount(count > 0 ? count - 1 : 0)
//                 setShow(false)
//                 setShowRed(true)
//               }}

//               className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 active:scale-95"
//             >
//               Decrement −
//             </button>


//             <button
//               onClick={() => {
//                 setShow(false)
//                 setShowRed(true)
//                 if (count == 0) {
//                   return notify()
//                 }
//                 const confirmation = confirm('are you sure to reset this counter?')
//                 if (!confirmation) return;
//                 setCount(0)

//               }}
//               className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 active:scale-95"
//             >
//               Reset
//             </button>

//             <ToastContainer />
//           </div>
//         </div>

//       </div>

//       <Todolist />
//     </>
//   )
// }


