import { ITask } from "@/types/tasks";
import Task from "./Task";

interface TodoListProps {
  tasks : ITask[]
}
const TodoList: React.FC<TodoListProps> = ({tasks}) => {
    return ( 
        <div className="overflow-x-auto">
  <table className="table">
   
    <thead>
      <tr>
       
        <th>Title</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {
        tasks.map((task) => (
        <Task key={task._id} task={task}/>

        ))
      }
     
    </tbody>
  </table>
</div>
     );
}
 
export default TodoList;