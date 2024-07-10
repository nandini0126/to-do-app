
import "./TodoCard.css"
import DelImg from "./delete.png"

function TodoCard({index, task, category,deleteItem}) {


  const CATEGORY_EMOJI={
    Learning: "📚",
    Work: "💼",
    Personal: "🏡",
    Shopping: "🛒",
    Health: "🏥",
    Others: "🗂️"
  }

  return (
    <div className="item-card">
      <img src={DelImg} alt="img" className="del-img" 
      onClick={()=>{
        deleteItem(index)
        }}/>
        {task} 
        
        <span className="category-badge">
        {CATEGORY_EMOJI[category]} 
        {category}</span>
    </div>
  )
}

export default TodoCard
