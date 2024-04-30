import './index.css'

const AccountDetails = props => {
  const {details, deletedetails, showpwdOrNot} = props
  const {website, username, password, color, id} = details
  const deleted = () => {
    deletedetails(id)
  }
  const hidePassword =
    'https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png'
  return (
    <li className="list-items">
      <div className="saved-account">
        <p className={color}>{username[0]}</p>
        <div className="deleteAndUsername-container">
          <div>
            <h1>{website}</h1>
            <p className="para">{username}</p>
            <p className="para">
              {!showpwdOrNot ? (
                <img src={hidePassword} alt="stars" className="hide" />
              ) : (
                password
              )}
            </p>
          </div>
          <button className="button" type="button" onClick={deleted}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
              alt="delete"
              className="delete"
            />
          </button>
        </div>
      </div>
    </li>
  )
}

export default AccountDetails
