import {Link} from 'react-router-dom'
import { FcTodoList } from "react-icons/fc"
import './index.css' 

const Header = () => (
    <nav className='nav-container'>
    <div className='logo-container'>
    <FcTodoList className="icon-logo" />
    <h1 className="app-name">TodoList</h1>
    </div>
    <div>
    <button>SavedTask</button>
    <button>DeleteTask</button>
    </div>
 
    </nav>
)

export default Header