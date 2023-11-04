import Todos from "./components/Todos"
import AddToDo from "./components/addToDo"
import Navbar from "./components/navbar"
import "./App.css"


const App = () => {
  return (
    <div>
      <main className="box">
      <h1>TODO REACT + TYPESCRIPT</h1>
      <Navbar/>
      <AddToDo/>
      <Todos/>
    </main>
    </div>
  )
}

export default App
