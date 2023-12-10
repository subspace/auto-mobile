export const deferTask = <T>(task: () => T) => {
  return new Promise<T>((resolve) => setTimeout(() => resolve(task())));
};
