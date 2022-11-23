import React, { Component } from 'react'
import { MdCancel } from "react-icons/md"
import Loader from 'react-loader-spinner'
import Header from '../Header'
import { v4 as uuidv4 } from 'uuid'
import UserList from '../UserList'
import './index.css'



const constantApiStatus = {
  initial: "INITIAL",
  inProcess: "INPROGRESS",
  inSuccess: "ORSUCCESS",
  inFailure: "ONFAILURE",
}


class Home extends Component {
  state = {
    input: '',
    taskData: [],
    apiStatus: constantApiStatus.initial,
    isClicked: false,
    isErrorShow: false,
    error: '',
    currentList: 'All'
  }

  onChageUserTask = Event => {
    const userValue = Event.target.value
    this.setState({ input: userValue })
  }

  componentDidMount() {
    this.getTaskList()
  }

  submitUserTask = async Event => {
    Event.preventDefault()
    const { input } = this.state
    const url = 'https://bhagyaleadzen-ai12.herokuapp.com/addTodo/'
    const userDetails = {
      id: uuidv4(),
      todo: input,
      isCompleted: false,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    }
    if (input !== '') {
      const response = await fetch(url, options)
      if (response.ok === false) {
        this.setState({ error: "User already exists", isErrorShow: true })
      }
      else {

        this.onCloseAddUserColumn()
        this.getTaskList()
      }
    } else {
      this.setState({ error: "Username should not empty value", isErrorShow: true })
    }

  }

  onCloseAddUserColumn = () => {
    this.setState({ isClicked: false, input: '' })
  }

  toggleCheckbox = async (id, isCompleted) => {
    console.log("toggle", isCompleted)
    let statusDetails = { isCompleted: isCompleted }
    console.log("statusDetails", statusDetails)
    const url = `https://bhagyaleadzen-ai12.herokuapp.com/update/${id}`
    const options = {
      method: "PUT",
      body: JSON.stringify(statusDetails),
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      this.getTaskList()
    }
  }

  onDeleteUserList = async (id) => {
    const url = `https://bhagyaleadzen-ai12.herokuapp.com/deleteTodo/${id}`
    const options = {
      method: 'DELETE',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      this.getTaskList()
    }
  }

  renderSuccessView = () => {
    const { taskData } = this.state
    console.log(taskData, 'data')
    return (
      <ul className='user-ul-container'>
        {
          taskData.map(eachUser => {
            if(this.state.currentList === 'Completed' && eachUser.isCompleted === 'true'){
              return (
                <UserList
                  onDeleteUserList={this.onDeleteUserList}
                  key={eachUser.id}
                  userListItems={eachUser}
                  toggleCheckbox={this.toggleCheckbox}
                />
              )
            }else if(this.state.currentList === 'Pending' && eachUser.isCompleted === 'false'){
              return (
                <UserList
                  onDeleteUserList={this.onDeleteUserList}
                  key={eachUser.id}
                  userListItems={eachUser}
                  toggleCheckbox={this.toggleCheckbox}
                />
              )
            }else if(this.state.currentList === 'All'){
              return (
                <UserList
                  onDeleteUserList={this.onDeleteUserList}
                  key={eachUser.id}
                  userListItems={eachUser}
                  toggleCheckbox={this.toggleCheckbox}
                />
              )
            }
            return null;
          })
        }
      </ul>
    )
  }

  failureView = () => (
    <div className='loading-container'>
      <img
        src="https://res.cloudinary.com/duv0mhzrm/image/upload/v1665899171/Background-Complete_wschfx.png"
        alt="failure view"
        className="error-image"
      />
      <p className="error-popular-para">
        Something went wrong, Please try again.
      </p>
      <button
        type="button"
        className="btn-popular"
        onClick={this.getTaskList}
      >
        Try Again
      </button>
    </div>
  )

  getTaskList = async () => {
    this.setState({ apiStatus: constantApiStatus.inProcess })
    const url = 'https://bhagyaleadzen-ai12.herokuapp.com/'
    const option = {
      method: 'GET',
    }
    const response = await fetch(url, option)
    console.log(response, 'ok')
    const data = await response.json()
    if (response.ok === true) {
      this.setState({ taskData: data })
      this.setState({ apiStatus: constantApiStatus.inSuccess })
    }
    else {
      this.setState({ apiStatus: constantApiStatus.inFailure })
    }

  }


  clickTodo = () => {
    this.setState({ isClicked: true })
  }

  renderLoadingView = () => {
    return (
      <div className='loading-container'>
        <Loader type="ThreeDots" color="blue" height={100} width={100} />
      </div>
    )

  }

  renderUserListData = () => {
    const { apiStatus } = this.state

    switch (apiStatus) {
      case constantApiStatus.inProcess:
        return this.renderLoadingView()
      case constantApiStatus.inSuccess:
        return this.renderSuccessView()
      case constantApiStatus.inFailure:
        return this.failureView()
      default:
        return null
    }
  }


  render() {
    const { isClicked, input } = this.state
    return (
      <div className='home-about'>
        <Header />
        <div className='user-list-button'>
          <h1 className='white'>Task List</h1>
          <button className='add-btn' onClick={this.clickTodo} type="button">Add Task</button>
          <button onClick={() => this.setState({ currentList: 'All' })} className="yellow">
            All List
            </button>
          <button onClick={() => this.setState({ currentList: 'Completed' })} className="green">
            Done List
            </button>
          <button onClick={() => this.setState({ currentList: 'Pending' })} className="red">Not Done</button>
        </div>
        {isClicked &&
          <form className='form-container' onSubmit={this.submitUserTask}>
            <MdCancel className='cancel-icon' onClick={this.onCloseAddUserColumn} />
            <label className="task" htmlFor="username" >Task</label>
            <input placeholder='What Needs To Be Done' id="username" className="input" type="text" value={input} onChange={this.onChageUserTask} />
            <button className='button' type='submit'>Add</button>
          </form>
        }
        {this.renderUserListData()}
      </div>
    )
  }
}
export default Home


