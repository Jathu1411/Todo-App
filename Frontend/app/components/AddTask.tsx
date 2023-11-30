"use client";
import {AiOutlinePlus} from 'react-icons/ai'
import Modal from './Modal';
import { FormEventHandler, useState } from 'react';
import { addTodo } from '@/api';
import { useRouter } from 'next/navigation';
const AddTask = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const router = useRouter();
    const [newTaskValue, setNewTaskValue] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await addTodo({
            title: newTaskValue,
            description: description
        })
        
        setNewTaskValue('');
        setDescription('');
        setModalOpen(false);
        router.refresh();
        
    }
    return (
        <div>
            <button className="btn btn-primary w-full" onClick={() => setModalOpen(true)}>
                Add New Task
                <AiOutlinePlus size={18} className="ml-2"/>
            </button>
            <Modal modalOpen={modalOpen} setModalOpen = {setModalOpen}>
               <form onSubmit={handleSubmitNewTodo}>
                <h3 className='font-bold text-lg pb-3'>
                    Add New Task
                </h3>
                <div className='flex flex-col gap-5'>
                <input type="text" value={newTaskValue} placeholder="Type here" 
                className="input input-bordered w-full" 
                onChange={e => setNewTaskValue(e.target.value)} required />
                <textarea className="textarea textarea-bordered" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                <button type='submit' className="btn">Submit</button>

                </div>
               </form>
            </Modal>
        </div>
    );
}
 
export default AddTask;