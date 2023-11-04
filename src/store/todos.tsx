import { ReactNode, createContext, useState, useContext } from "react";



export type todosProviderProps = {
    children : ReactNode
}

export type Todo = {
    id: string;
    task: string;
    completed: boolean;
    createDate: Date;
}

export type todoContext = {
    todos : Todo[];
    handleAddToDo:(task:string) => void;
    toggleTodoAsCompleted:(id:string) => void;
    handleDeleteTodo:(id:string) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const todoContext =  createContext<todoContext | null>(null) 

export const TodoProvider = ({children}:todosProviderProps) =>{

    const[todos, setTodo] = useState<Todo[]> (() => {
        try {
            const newTodos = localStorage.getItem("todos") || "[]"
            return JSON.parse(newTodos) as Todo[]
        } catch (error) {
            return []
        }
    } )

    const handleAddToDo = (task: string) => {

        setTodo((prev) => {
            const newTodo: Todo[] = [
                {
                    id: Math.random().toString(),
                    task: task,
                    completed: false,
                    createDate: new Date()
                },
                ...prev
            ]
           // console.log("my prev data "+ prev);

           // console.log(newTodo);
            localStorage.setItem("todos",JSON.stringify(newTodo))
            return newTodo
        })

    }

    const toggleTodoAsCompleted = (id:string) => {
        setTodo((prev) => {
            const newTodos = prev.map((todo) => {
                if(todo.id === id){
                    return { ... todo, completed:!todo.completed}
                }
                return todo;
            })
            localStorage.setItem("todos",JSON.stringify(newTodos))
            return newTodos
        })
    }

    const handleDeleteTodo = (id: string) =>{
        setTodo((prev) => {
            const newTodo = prev.filter((filterTodo) => filterTodo.id !==id);
            localStorage.setItem("todos",JSON.stringify(newTodo))
            return newTodo;
        })
    }

    return <todoContext.Provider value={{todos, handleAddToDo, toggleTodoAsCompleted, handleDeleteTodo}}>
        {children}
    </todoContext.Provider>
}


//consumer

// eslint-disable-next-line react-refresh/only-export-components
export const useTodos = () => {
    const todosConsumer = useContext(todoContext);
    if(!todosConsumer){
        throw new Error("useTodos used outside of Provider");    
    }
    return todosConsumer;
}