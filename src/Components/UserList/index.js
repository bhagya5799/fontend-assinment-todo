import {Link} from 'react-router-dom'
import { MdDeleteOutline } from "react-icons/md";
import './index.css' 

const UserList = props => {
    const {userListItems, onDeleteUserList, isCheckInputBox} = props 
    const {id,todo, isCompleted} = userListItems 
    const randomColor = [
        "color1" ,"color2","color3" ,"color4","color5" ,"color6",
    ]
    const result = randomColor[Math.floor(Math.random() * randomColor.length)]
    
    const deleteUser = () => {
        if (isCompleted === true){
            return null;
        }
        else{
            onDeleteUserList(id)
        }
    } 

     const isCompetedTask = () => {
        isCheckInputBox(id, isCompleted)
    }

    const status = isCompleted?  'COMPLETED' : 'PENDING'
    const statusColor = isCompleted ? 'color1' : 'color5'
    const isChecked = isCompleted ? 'true' : 'false'

    return(
        <li className='li-container-task'>
        <div className='li-sub-container'>
            <input type="checkbox" className='checkbox' checked={isCompleted} onChange={isCompetedTask} />
            <p className='each-task-para'>{todo}</p>
        </div>
            <p className={`statusColor ${statusColor}`}>{status}</p>
            <MdDeleteOutline className="delete-icon" onClick={deleteUser} />
        </li>
    )
}

export default UserList
