import "./Home.css"
import TodoCard from "../../components/TodoCard/TodoCard"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import Swal from "sweetalert2"


function Home() {

    const [todolist, setTodoList] = useState([])

    const [newTask, setNewTask] = useState("")

    const [category, setCategory]=useState("")


    useEffect(()=>{
        const savedList=localStorage.getItem("todoList")

        if(savedList){
            setTodoList(JSON.parse(savedList))
        }
    }, [])


    useEffect(()=>{
        if(todolist.length===0) return

        localStorage.setItem("todoList", JSON.stringify(todolist))
    },[todolist])

    function deleteItem(index){
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this task",
            icon: 'warning',
            showCancelButton: true
        }).then((result)=>{
            if(!result.isConfirmed){
                return
            }

            const newtodoList=todolist.filter((item,i)=>{
                if(i==index){
                    return false
                }
                else{
                    return true
                }
            })
            setTodoList(newtodoList)
        })


        
    }

    
    return (
        <>
            <h1 className="heading">TO DO APP 📝</h1>
            <div className="input-container">
                <input type="text" placeholder="What do you need to do" className="input-box"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />

                <select className="categories" value={category}
                onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Category</option>
                    <option value="Learning">Learning</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Health">Health</option>
                    <option value="Others">Others</option>
                </select>
                <button className="btn"
                    onClick={() => {
                        if (newTask === "") {
                            toast.error("Task cannot be empty!")
                            return
                        }
                        if (category === "") {
                            toast.error("select a category!")
                            return
                        }
                        setTodoList([...todolist, {task: newTask, category:category}])
                        setNewTask("")
                        setCategory("")
                        toast.success("Task added successfully!")
                    }}
                >ADD</button>




            </div>
            <div className="task-container">
                {
                    todolist.map((todoItem, i) =>{ 
                    
                    const {task, category}=todoItem
                    
                    return <TodoCard key={i} index={i} task={task} category={category} deleteItem={deleteItem} />
                })
                }
                {
                    todolist.length === 0
                        ?
                        <p className="empty-text">Nothing to show. Please add a new task...</p>
                        :
                        null
                }
                <Toaster position="top-right" />
            </div>


        </>
    )
}

export default Home