import {Component} from 'react'

import {v4} from 'uuid'

import AccountDetails from '../AccountDetails'

import './index.css'

const randomColors = [
  'color5',
  'color7',
  'color8',
  'color9',
  'color10',
  'color11',
  'color12',
  'color13',
]

class Cards extends Component {
  state = {
    thePasswordsList: [],
    username: '',
    pwd: '',
    website: '',
    showpassword: false,
    searchInput: '',
  }

  getListOfPasswords = () => {
    const {searchInput, thePasswordsList} = this.state
    const data = thePasswordsList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return data
  }

  passwordSaved = event => {
    event.preventDefault()
    const {username, pwd, website} = this.state
    const randomColor = Math.floor(Math.random() * randomColors.length)
    const color = randomColors[randomColor]
    const list = {
      username,
      password: pwd,
      website,
      id: v4(),
      color,
    }
    this.setState(prevState => ({
      thePasswordsList: [...prevState.thePasswordsList, list],
      username: '',
      website: '',
      pwd: '',
      showpassword: false,
    }))
  }

  usernameEntered = event => {
    this.setState({username: event.target.value})
  }

  passwordEntered = event => {
    this.setState({
      pwd: event.target.value,
    })
  }

  websiteEntered = event => {
    this.setState({website: event.target.value})
  }

  deleteAccountDetails = id => {
    const {thePasswordsList} = this.state
    const filteredList = thePasswordsList.filter(eachItem => eachItem.id !== id)
    this.setState({thePasswordsList: filteredList})
  }

  showedPassword = event => {
    let shpwd
    if (event.target.checked) {
      shpwd = true
    } else {
      shpwd = false
    }
    this.setState({showpassword: shpwd})
  }

  searchInputelement = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {
      username,
      website,
      pwd,
      showpassword,
      thePasswordsList,
      searchInput,
    } = this.state
    const len = pwd.length
    const hide = '*'.repeat(len)
    const passwordList = this.getListOfPasswords()
    const isempty = passwordList.length === 0
    return (
      <div className="main-container">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="icon"
          />
          <div className="password-manager-container-one">
            <form
              className="form-control form-container"
              onSubmit={this.passwordSaved}
            >
              <h1>Add New Password</h1>
              <div className="form-websiter-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="form-icon"
                />
                <input
                  placeholder="Enter Website"
                  className="website-input"
                  onChange={this.websiteEntered}
                  value={website}
                  type="text"
                />
              </div>
              <div className="form-websiter-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                  alt="username"
                  className="form-icon"
                />
                <input
                  placeholder="Enter Username"
                  className="website-input"
                  onChange={this.usernameEntered}
                  value={username}
                  type="text"
                />
              </div>
              <div className="form-websiter-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="form-icon"
                />
                <input
                  placeholder="Enter Password"
                  className="website-input"
                  type="text"
                  onChange={this.passwordEntered}
                  value={!showpassword ? pwd : hide}
                />
              </div>
              <div className="form-button-container">
                <button className="form-button" type="submit">
                  Add
                </button>
              </div>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="password-manager-image"
            />
          </div>
          <div className="password-manager-container-two">
            <div className="Navbar">
              <h1 className="heading-password">
                Your Passwords{' '}
                <span className="span-element">{thePasswordsList.length}</span>
              </h1>
              <div className="search-passwords">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-icon"
                />
                <input
                  placeholder="Search"
                  type="search"
                  className="input-element"
                  onChange={this.searchInputelement}
                  value={searchInput}
                />
              </div>
            </div>
            <hr className="hr" />
            <div className="show-password">
              <input
                type="checkbox"
                id="password"
                className="checkbox"
                onChange={this.showedPassword}
                value={pwd}
              />
              <label htmlFor="password" className="inputCheck">
                Show Password
              </label>
            </div>
            <div className="elements-container">
              {!isempty ? (
                <ul className="ul-elements">
                  {passwordList.map(eachItem => (
                    <AccountDetails
                      details={eachItem}
                      key={eachItem.id}
                      deletedetails={this.deleteAccountDetails}
                      showpwdOrNot={showpassword}
                    />
                  ))}
                </ul>
              ) : (
                <div className="no-passwords">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    alt="no passwords"
                    className="no-passwords-image"
                  />
                  <p className="no-passwords-para">No Passwords</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Cards
