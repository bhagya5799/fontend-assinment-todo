import { MdDeleteOutline } from "react-icons/md";
import './index.css' 

const UserList = props => {
    const {userListItems, onDeleteUserList, toggleCheckbox} = props 
    const {id,todo, isCompleted }= userListItems 
    console.log("props", userListItems)
    
    const deleteUser = () => {
        if (isCompleted === true){
            return null;
        }
        else{
            onDeleteUserList(id)
        }
    } 

     const isCompetedTask = () => {
        toggleCheckbox(id, !JSON.parse(isCompleted))
    }

    const status = !JSON.parse(isCompleted)?  'PENDING':'COMPLETED'
    const statusColor = JSON.parse(isCompleted) ? 'color1' : 'color5'

    return(
        <li className='li-container-task'>
        <div className='li-sub-container'>
            <input type="checkbox" className='checkbox' checked={JSON.parse(isCompleted)} onChange={isCompetedTask} />
            <p className='each-task-para'>{todo}</p>
        </div>
            <p className={`statusColor ${statusColor}`}>{status}</p>
            <MdDeleteOutline className="delete-icon" onClick={deleteUser} />
        </li>
    )
}

export default UserList
