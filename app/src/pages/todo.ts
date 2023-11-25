declare var todo: ToDoList;

interface ToDoList {
    show(option: Record<string, any>): boolean;
}

interface ToDoListData {}

interface Options {}

(function (global: any) {
    //onclick();

    global.todo = todo;
})(typeof window !== 'undefined' ? window : this);

export const showProgress = (todo as any).show;
