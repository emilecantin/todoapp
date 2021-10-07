// Mock api
//

export enum TaskState {
  Todo,
  InProgress,
  Done,
}

export interface Task {
  id: number;
  name: string;
  description: string;
  state: TaskState;
}

function delay() {
  // simulate an API call
  return new Promise((resolve) => {
    const waitTime = 1000 + Math.floor(Math.random() * 2000);
    window.setTimeout(resolve, waitTime);
  });
}

const LOCALSTORAGE_KEY = "todo:tasks";

export class TasksApi {
  static async getTasks() {
    await delay();
    const data = window.localStorage.getItem(LOCALSTORAGE_KEY);
    if (data) {
      const tasks: Task[] = JSON.parse(data);
      return tasks;
    }
    return [] as Task[];
  }

  static async getTask(id: number) {
    const tasks = await this.getTasks();
    return tasks.find((t) => t.id === id);
  }

  static async addTask(name: string, description: string, state?: TaskState) {
    const tasks = await this.getTasks();
    const last = tasks[tasks.length - 1];
    const id = (last?.id || 0) + 1;
    const task: Task = {
      id,
      name,
      description,
      state: state || TaskState.Todo,
    };
    tasks.push(task);
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(tasks));
    return task;
  }

  static async updateTask(task: Task) {
    const tasks = await this.getTasks();
    const updated = tasks.map((t) => (t.id === task.id ? task : t));
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(updated));
    return task;
  }
}

if (!window.localStorage.getItem(LOCALSTORAGE_KEY)) {
  // Set default data
  const tasks: Task[] = [
    {
      id: 1,
      name: "Prepare the designs",
      description: "",
      state: TaskState.Todo,
    },
    {
      id: 2,
      name: "Submit the designs for approval",
      description: "",
      state: TaskState.Todo,
    },
    {
      id: 3,
      name: "Implement the designs",
      description: "",
      state: TaskState.Todo,
    },
  ];
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(tasks));
}
