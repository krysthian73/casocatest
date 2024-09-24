import { useRef, useState } from "react";
import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Column, Task } from "@/app/types/tasksTypes/types";
import Api from "@/app/services/api";

const initialColumns: Column[] = [
  { id: "column-1", type: "pending", title: "Pendente", tasks: [] },
  { id: "column-2", type: "in progress", title: "Andamento", tasks: [] },
  { id: "column-3", type: "completed", title: "Concluída", tasks: [] },
];

export function useTask() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const originalColumnsRef = useRef<Column[]>(initialColumns);

  const fetchUserTasks = async (userId: number) => {
    setIsLoading(true);
    try {
      const response = await Api.get(`/tasks/user/${userId}`);
      const tasks = response.data.data || [];

      const userColumns = initialColumns.map((column) => ({
        ...column,
        tasks: tasks.filter((task: Task) => task.status === column.type),
      }));

      setColumns(userColumns);
      originalColumnsRef.current = userColumns;
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar tarefas do usuário:", error);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const task = columns.flatMap((column) => column.tasks).find((task) => task.id === event.active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeTaskId = active.id;
    const overContainerId = over.id;
    const activeContainer = findContainer(String(activeTaskId));
    const overContainer = findContainer(String(overContainerId));

    if (!activeContainer || !overContainer) return;

    if (activeContainer.id === overContainer.id) {
      const activeIndex = activeContainer.tasks.findIndex((task) => task.id === activeTaskId);
      const overIndex = overContainer.tasks.findIndex((task) => task.id === over.id);
      if (activeIndex !== overIndex) {
        const updatedTasks = arrayMove(activeContainer.tasks, activeIndex, overIndex);

        setColumns((prevColumns) =>
          prevColumns.map((column) =>
            column.id === activeContainer.id ? { ...column, tasks: updatedTasks } : column
          )
        );
      }
    } else {
      const activeItems = activeContainer.tasks.filter((task) => task.id !== activeTaskId);
      let movedTask = activeContainer.tasks.find((task) => task.id === activeTaskId)!;
      movedTask = { ...movedTask, status: overContainer.type }
      const overItems = [...overContainer.tasks, movedTask!];

      if (movedTask) {
        await updateTaskPosition(movedTask, activeContainer.id, activeItems, overContainer.id, overItems);
      }

    }
    setActiveTask(null);
  };

  const updateTaskPosition = async (task: Task,
    activeContainerId: string,
    activeItems: Task[],
    overContainerId: string,
    overItems: Task[]) => {
    try {
      setColumns((prevColumns) =>
        prevColumns.map((column) =>
          column.id === activeContainerId
            ? { ...column, tasks: activeItems }
            : column.id === overContainerId
              ? { ...column, tasks: overItems }
              : column
        )
      );
      const { status, description, title } = task
      await Api.patch(`/tasks/${task.id}`, {
        status,
        description,
        title
      });
    } catch (error) {
      console.error("Erro ao atualizar a tarefa", error);
      setColumns(originalColumnsRef.current);
    }
  };

  const findContainer = (taskId: string): Column | undefined => {
    return columns.find(
      (column) => column.tasks.some((task) => String(task.id) === taskId) || column.id === taskId
    );
  };

  return {
    isLoading,
    columns,
    activeTask,
    handleDragEnd,
    handleDragStart,
    fetchUserTasks,
  };
}
