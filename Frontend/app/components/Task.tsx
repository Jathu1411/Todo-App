"use client";
import { ITask } from "@/types/tasks";
import React, { FormEvent, FormEventHandler } from "react";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
    task: ITask
}
const Task: React.FC<TaskProps> = ({ task }) => {
    const router = useRouter();
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<ITask>(task);
    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await editTodo({
            _id: taskToEdit._id,
            title: taskToEdit.title,
            description: taskToEdit.description,
            isCompleted: taskToEdit.isCompleted
        })
        setOpenModalEdit(false);
        router.refresh();
    }

    const handleDeleteTask = async (id: string | undefined) => {
        if (id) {
            await deleteTodo(id);
            setOpenModalEdit(false);
            router.refresh();
        } else {
            return;
        }
    }

    return (
        <tr key={task._id}>
            <th className={`w-1/2 ${task.isCompleted ? "text-green-400" : "text-yellow-400"}`}>{task.title}</th>
            <td className={`w-full ${task.isCompleted ? "text-green-400" : "text-yellow-400"}`}>{task.description}</td>
            <td className="flex gap-5">
                <FiEdit cursor="pointer" className="text-blue-500" size={25} onClick={() => setOpenModalEdit(true)} />
                <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                    <form onSubmit={handleSubmitEditTodo}>
                        <h3 className='font-bold text-lg pb-3'>
                            Edit Task
                        </h3>
                        <div className='flex flex-col gap-5'>
                            <input type="text" value={taskToEdit.title} placeholder="Type here"
                                className="input input-bordered w-full"
                                onChange={e => setTaskToEdit({ ...taskToEdit, title: e.target.value })} />
                            <textarea className="textarea textarea-bordered" placeholder="Description" value={taskToEdit.description} onChange={e => setTaskToEdit({ ...taskToEdit, description: e.target.value })}></textarea>
                            <label className="label cursor-pointer">
                                <span className="label-text">Completed?</span>
                                <input type="checkbox" className="toggle" checked={taskToEdit.isCompleted || false} onChange={(e) => setTaskToEdit({ ...taskToEdit, isCompleted: e.target.checked })}/>
                            </label>
                            <button type='submit' className="btn">Submit</button>

                        </div>
                    </form>
                </Modal>
                <FiTrash2 cursor="pointer" className="text-red-500" size={25} onClick={() => setOpenModalDelete(true)} />
                <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
                    <h3 className="text-lg">Are you Sure, you want to delete this task?</h3>
                    <div className="modal-action">
                        <button className="btn" onClick={() => handleDeleteTask(task._id)}>Yes</button>
                        <button className="btn" onClick={() => setOpenModalDelete(false)}>No</button>
                    </div>
                </Modal>
            </td>
        </tr>
    );
}

export default Task;