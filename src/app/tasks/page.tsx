"use client";
import {
  DndContext,
  closestCenter,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DarkModeToggle from "@/app/components/DarkModeToggle";
import UserAvatar from "../login/components/logout";
import type { Column, Task } from "@/app/types/tasksTypes/types";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTask } from "../hooks/useTask";

export default function Tasks() {
  const { activeTask, handleDragStart, handleDragEnd, fetchUserTasks, columns, isLoading } = useTask();
  const [isClient, setIsClient] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    setIsClient(true);
    if (user) {
      fetchUserTasks(user.id);
    }
  }, []);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="flex justify-end mb-4 gap-5">
        <DarkModeToggle />
        {isClient && user?.email && <UserAvatar email={user?.email} />}
      </div>
      <div className="flex flex-col md:flex-row p-4 md:p-10 space-y-4 md:space-y-0 md:space-x-4 justify-center bg-gray-100 dark:bg-gray-900">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          {columns.map((column) => (
            <Column key={column.id} column={column} />
          ))}

          <DragOverlay>
            {activeTask ? (
              <div className="p-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded shadow-lg">
                {activeTask.title}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}

const Column: React.FC<{ column: Column }> = ({ column }) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg w-full md:w-80 min-h-[500px] shadow-md"
    >
      <h2 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">
        {column.title}
      </h2>
      <SortableContext
        items={column.tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        {column.tasks.map((task) => (
          <Item key={task.id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
};


const Item: React.FC<{ task: Task }> = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 9999 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-4 rounded shadow mb-2"
    >
      {task.title}
    </div>
  );
};