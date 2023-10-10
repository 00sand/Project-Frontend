import { Link } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';

const DND_Task = ({ task, index, status }) => {

    const priorityMapping = {
        1: 'normal',
        2: 'medium',
        3: 'urgent'
    };

    const taskPriority = priorityMapping[task.priority];

    let colorClass = '';

    if (taskPriority === 'normal') {
        colorClass = 'bg-green-500';
    } else if (taskPriority === 'medium') {
        colorClass = 'bg-yellow-500';
    } else if (taskPriority === 'urgent') {
        colorClass = 'bg-red-500';
    }

    return (

        <Draggable key={`${status}-${index}`} draggableId={`${status}-${index}`} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`mb-4 p-3 rounded-md shadow ${colorClass} text-white`}
                >
                    <Link to={`/task/${task.taskId}`} className="text-white block">
                        <p>{task.title}</p>
                        <p className="text-sm mt-1">{task.taskDetails}</p>
                    </Link>
                </div>
            )}
        </Draggable>
    );
};
export default DND_Task;
