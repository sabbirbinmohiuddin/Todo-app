import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { MdDelete, MdOutlineTaskAlt } from "react-icons/md";
import { TbEditFilled } from "react-icons/tb";
import { IoIosAddCircleOutline } from "react-icons/io";
import { VscClearAll } from "react-icons/vsc";
import { RxUpdate } from "react-icons/rx";
import { FaCheck, FaXmark } from 'react-icons/fa6';

// type Todo = {
//     id: string | number,
//     title: string
// }
type Todo = {
    id: string | number,
    title: string,
    completed: boolean
}

export default function Todolist() {
    const [enterForm, setEnterForm] = useState('')
    // const [mainTodo, setMainTodo] = useState<Todo[]>([])

    const [mainTodo, setMainTodo] = useState<Todo[]>(() => {
        try {
            const savedTodos = localStorage.getItem('my-daily-todos');

            if (savedTodos) {
                const parsedTodos = JSON.parse(savedTodos);

                if (Array.isArray(parsedTodos)) {
                    return parsedTodos.map((item) => ({
                        ...item,
                        completed: item.completed ?? false,
                    }));
                }
            }

            return [];
        } catch (error) {
            console.error('Failed to load todos:', error);
            return [];
        }
    });

    const [editId, setEditId] = useState<string | null>(null)


    // auto save task 
    useEffect(() => {
        try {
            localStorage.setItem(
                'my-daily-todos',
                JSON.stringify(mainTodo)
            );
        } catch (error) {
            console.error('Failed to save todos:', error);
            toast.error('Could not save your tasks!', {
                position: 'top-right'
            });
        }
    }, [mainTodo]);


    // add button
    const handleClick = () => {
        if (!enterForm.trim()) {
            return toast.error('Please Add Your Task', {
                theme: 'colored',
                position: 'top-right',
                autoClose: 2000,
            })
        }
        const newObj = {
            id: crypto.randomUUID(),
            title: enterForm,
            completed: false
        }
        setMainTodo([
            ...mainTodo,
            newObj
        ])
        setEnterForm('')
        toast.success('Your Task Added Successfully', {
            autoClose: 2000,
            theme: 'colored',
            position: 'top-right'
        })
    }
    // dlt btn 
    const handleDelete = (id: string) => {
        const isConfirm = confirm('Are you sure for remove this item?');
        if (!isConfirm) return
        const updateTodosAfterDelete = mainTodo.filter((item) => {
            return item.id != id
        })
        setMainTodo(updateTodosAfterDelete)
        toast.success('Task Deleted Successfully', {
            position: 'top-right'
        })
    }
    // handleComplete
    const handleComplete = (id: string | number, completed: boolean) => {
        setMainTodo((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, completed }
                    : item
            )
        )

        toast.success(
            completed ? 'Task Completed!' : 'Task marked as incomplete!', {
            position: 'top-right'
        }
        )
    }

    // edit btn
    const handleEdit = (item: Todo) => {
        setEnterForm(item.title)
        setEditId(String(item.id))
    }


    // update btn
    const handleUpdate = () => {
        if (!enterForm.trim()) {
            return toast.error('Please enter your task', {
                position: 'top-right'
            })
        }

        if (editId === null) return

        const updatedTodos = mainTodo.map((item) =>
            String(item.id) === editId
                ? { ...item, title: enterForm.trim() }
                : item
        )

        setMainTodo(updatedTodos)
        setEnterForm('')
        setEditId(null)

        toast.success('Task Updated Successfully', {
            position: 'top-right'
        })
    }

    // reset btn 
    const handleReset = () => {
        if (mainTodo.length === 0) {
            return toast.error('There aren`t any task in your section.')
        }
        const isConfirm = confirm('Are you sure for clear all task?')
        if (!isConfirm) return
        setMainTodo([]);
        toast.success('All task has been cleared!', {
            theme: 'dark',
            position: 'top-right'
        })
    }


    return (
        <div className="min-h-screen bg-slate-100 px-4 py-12 sm:px-6">

            <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70">

                {/* Header */}
                <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700 px-6 py-8 text-white sm:px-9 sm:py-10">
                    <div className="absolute -right-10 -top-12 h-44 w-44 rounded-full bg-white/10" />
                    <div className="absolute -bottom-20 right-28 h-40 w-40 rounded-full bg-white/10" />

                    <div className="relative">
                        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-3xl shadow-lg ring-1 ring-white/20">
                            <MdOutlineTaskAlt />
                        </div>

                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-100">
                            Stay focused · Stay productive
                        </p>

                        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                            My Todo List
                        </h1>

                        <p className="mt-3 max-w-sm text-sm leading-6 text-emerald-50">
                            Organize your day, manage your tasks, and get things done.
                        </p>

                        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium">
                            <span className="h-2 w-2 rounded-full bg-lime-300" />
                            {mainTodo.length} {mainTodo.length === 1 ? 'task' : 'tasks'} in your list
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-8">

                    {/* Summary */}
                    <div className="mb-8 grid grid-cols-2 gap-4">
                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 sm:p-5">
                            <p className="text-sm font-medium text-emerald-700">
                                Total Tasks
                            </p>
                            <h2 className="mt-2 text-3xl font-extrabold text-slate-800">
                                {mainTodo.length}
                            </h2>
                            <p className="mt-1 text-xs text-slate-500">
                                Tasks in your list
                            </p>
                        </div>

                        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 sm:p-5">
                            <p className="text-sm font-medium text-blue-700">
                                Your Workspace
                            </p>
                            <h2 className="mt-2 text-xl font-extrabold text-slate-800">
                                {editId === null ? 'Ready to go' : 'Editing task'}
                            </h2>
                            <p className="mt-1 text-xs text-slate-500">
                                {editId === null ? 'Add a new task' : 'Update your task'}
                            </p>
                        </div>
                    </div>

                    {/* Input */}
                    <div className="mb-8">
                        <label className="mb-3 block text-sm font-bold text-slate-700">
                            {editId === null ? 'Create a new task' : 'Edit your task'}
                        </label>

                        <div className={`flex flex-col gap-3 rounded-2xl border bg-slate-50 p-2 transition focus-within:ring-4 sm:flex-row ${editId === null
                            ? 'border-slate-200 focus-within:border-emerald-400 focus-within:ring-emerald-100'
                            : 'border-blue-300 focus-within:border-blue-400 focus-within:ring-blue-100'
                            }`}>
                            <input
                                placeholder="What do you need to do?"
                                value={enterForm}
                                onChange={(event) => setEnterForm(event.target.value)}
                                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 sm:px-4"
                                type="text"
                            />

                            {editId === null ? (
                                <button
                                    onClick={handleClick}
                                    type="button"
                                    className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700 active:translate-y-0"
                                >
                                    <IoIosAddCircleOutline className="text-xl" />
                                    Add Task
                                </button>
                            ) : (
                                <button
                                    onClick={handleUpdate}
                                    type="button"
                                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 active:translate-y-0"
                                >
                                    <RxUpdate className="text-lg" />
                                    Update Task
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Task List Heading */}
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-extrabold text-slate-800">
                                Your Tasks
                            </h2>
                            <p className="mt-1 text-xs text-slate-500">
                                Keep everything organized
                            </p>
                        </div>

                        <button
                            onClick={handleReset}
                            type="button"
                            className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:border-red-200 hover:bg-red-100 sm:px-4 sm:text-sm"
                        >
                            <VscClearAll className="text-lg" />
                            Clear All
                        </button>
                    </div>

                    {/* Task Items */}
                    <div className="space-y-3">
                        {mainTodo.length === 0 ? (
                            <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-5 py-12 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-3xl text-emerald-600">
                                    <MdOutlineTaskAlt />
                                </div>

                                <h3 className="text-base font-bold text-slate-800">
                                    No tasks yet
                                </h3>

                                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">
                                    Your task list is waiting. Add your first task above to get started.
                                </p>
                            </div>
                        ) : (
                            mainTodo.map((item, index) => (
                                <div
                                    key={item.id}
                                    // className={`group flex min-w-0 items-center gap-3 rounded-2xl border p-3 transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:gap-4 sm:p-4 ${editId === String(item.id)
                                    //     ? 'border-blue-300 bg-blue-50 shadow-sm'
                                    //     : 'border-slate-200 bg-white hover:border-emerald-200'
                                    //     }`}

                                    className={`group flex min-w-0 flex-col items-stretch gap-3 rounded-2xl border p-3 transition duration-200 hover:shadow-md sm:flex-row sm:items-center sm:gap-4 sm:p-4 ${editId === String(item.id)
                                            ? 'border-blue-300 bg-blue-50 shadow-sm'
                                            : 'border-slate-200 bg-white hover:border-emerald-200'
                                        }`}
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-sm font-extrabold text-emerald-700 transition group-hover:bg-emerald-100">
                                        {String(index + 1).padStart(2, '0')}
                                    </div>

                                    <div className="min-w-0 w-full flex-1 py-1">
                                        <p
                                            className={`block w-full whitespace-normal break-words [overflow-wrap:anywhere] text-sm font-bold leading-6 sm:text-base ${item.completed
                                                    ? 'text-gray-400 line-through'
                                                    : 'text-slate-800'
                                                }`}
                                        >
                                            {item.title}
                                        </p>
                                    </div>

                                    <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:shrink-0">
                                        {/* <div className="flex shrink-0 items-center gap-2"> */}
                                        <button
                                            onClick={() => handleEdit(item)}
                                            type="button"
                                            title="Edit task"
                                            aria-label={`Edit ${item.title}`}
                                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-lg text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-600 hover:text-white sm:h-10 sm:w-10"
                                        >
                                            <TbEditFilled />
                                        </button>

                                        <button
                                            onClick={() => handleDelete(item.id as string)}
                                            type="button"
                                            title="Delete task"
                                            aria-label={`Delete ${item.title}`}
                                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-lg text-red-500 transition hover:border-red-300 hover:bg-red-500 hover:text-white sm:h-10 sm:w-10"
                                        >
                                            <MdDelete />
                                        </button>
                                        <button
                                            onClick={() => handleComplete(item.id, true)}
                                            title="Mark as completed"
                                            className="rounded-lg bg-green-100 p-2 text-green-700 hover:bg-green-500 hover:text-white"
                                        >
                                            <FaCheck />
                                        </button>

                                        <button
                                            onClick={() => handleComplete(item.id, false)}
                                            title="Mark as incomplete"
                                            className="rounded-lg bg-orange-100 p-2 text-orange-700 hover:bg-orange-500 hover:text-white"
                                        >
                                            <FaXmark />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    <div className="mt-7 flex flex-col items-center justify-between gap-2 border-t border-slate-100 pt-5 text-center sm:flex-row sm:text-left">
                        <p className="text-xs text-slate-400">
                            Stay organized. Make every day count.
                        </p>

                        <p className="text-xs font-semibold text-emerald-700">
                            {mainTodo.length === 0
                                ? 'Created by SABBIR BIN MOHIUDDIN'
                                : `Created by SABBIR BIN MOHIUDDIN`}
                            {/* ${mainTodo.length} task${mainTodo.length !== 1 ? 's' : ''} in your list */}
                        </p>
                        {/* <P>
                            Created by SABBIR BIN MOHIUDDIN
                        </P> */}
                    </div>
                </div>
            </div>

            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                theme="colored"
            />
        </div>
    );
}