import Home from './Components/Home/index'
// import UserDetails from './components/UserDetails'
import './App.css' 
import { Route, Routes } from "react-router-dom"

const App = () => ( 
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
)

export default App