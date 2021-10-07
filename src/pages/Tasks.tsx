import React from "react";
import { useQuery } from "react-query";
import { TasksApi } from "../api/tasks";
import { MainView } from "../components/MainView";

const TasksTable: React.FC = () => {
  const { data: tasks, isLoading } = useQuery(["tasks"], async () => {
    return TasksApi.getTasks();
  });
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (tasks?.length) {
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.name}</td>
              <td>{task.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else {
    return <div>No tasks to display here!</div>;
  }
};

export const Tasks: React.FC = () => {
  return (
    <MainView>
      <h1> Tasks</h1>
      <TasksTable />
    </MainView>
  );
};
