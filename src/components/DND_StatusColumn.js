// StatusColumn.js
import { Droppable } from 'react-beautiful-dnd';
import DND_Task from './DND_Task';

const DND_StatusColumn = ({ status, data }) => (
  <Droppable droppableId={status} key={status}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className="w-64 p-4 mx-2 bg-gray-800 rounded-lg"

      >
        <h3 className="text-3xl text-white font-bold mb-6">{data.name}</h3>
        {data.items.map((item, index) => (
          <DND_Task task={item} index={index} status={status} key={item.taskId} />
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

export default DND_StatusColumn;
