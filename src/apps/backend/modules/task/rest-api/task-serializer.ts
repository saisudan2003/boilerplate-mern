import { Task } from 'backend/modules/task';

export const serializeTaskAsJSON = (task: Task): unknown => ({
  id: task.id,
  account: task.account,
  description: task.description,
  title: task.title,
});
