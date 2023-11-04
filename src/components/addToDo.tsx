import { FormEvent, useState } from "react"
import { useTodos } from "../store/todos";

const AddToDo = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const[todo, setTodo] = useState("");
    const {handleAddToDo} = useTodos();

    const handleFormSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleAddToDo(todo);
        setTodo("");
    }



    return (
        <form onSubmit={handleFormSubmit}>
            <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
            <button type="submit">submit</button>
        </form>
  )
}

export default AddToDo
