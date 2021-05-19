import React from 'react'
import { Modal } from 'bootstrap'
import Spinner from '../components/Spinner'

const API_URI = 'https://60a3502f7c6e8b0017e26af6.mockapi.io/api/v1/employees?page=1&limit=5'

const TableData = (props) => {
  return props.data?.map((d, i) => {
    return (
      <tr key={i}>
        <td>{d.name}</td>
        <td>{d.email}</td>
        <td>{d.position}</td>
      </tr>
    )
  })
}

const TableLoader = () => {
  return (
    <tr>
      <td colSpan="3">Loading...</td>
    </tr>
  )
}

const Tfoot = (props) => {
  const { modal } = props

  return (
    <tfoot>
      <tr>
        <td colSpan="3">
          <div className="d-flex align-items-center">
            <button onClick={() => modal.show()} className="btn btn-secondary me-auto" type="button">+&nbsp;New</button>

            <nav aria-label="Employees pagination">
              <ul className="pagination mb-0">
                <li className="page-item">
                  <a className="page-link" href="/" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="/">1</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="/2">2</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="/3">3</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="/" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </td>
      </tr>
    </tfoot>
  )
}

const defaultState = {
  value: '',
  isError: false,
  invalidFeedback: ''
}

export default function Employees() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [formLoading, setFormLoading] = React.useState(false)
  const [name, setName] = React.useState(defaultState)
  const [email, setEmail] = React.useState(defaultState)
  const [position, setPosition] = React.useState(defaultState)
  const [employees, setEmployees] = React.useState([])
  const [modal, setModal] = React.useState(null);
  const modalRef = React.useRef();

  React.useEffect(() => setModal(new Modal(modalRef.current)), [])
  React.useEffect(() => {
    const modalin = document.getElementById('modalin')

    modalin.addEventListener('show.bs.modal', (e) => {
      console.log('show')
    })

    modalin.addEventListener('hide.bs.modal', (e) => {
      setFormLoading(false)
      setName(defaultState)
      setEmail(defaultState)
      setPosition(defaultState)
    })
  }, [])
  React.useEffect(() => {
    setIsLoading(true)

    fetch(API_URI)
      .then(response => response.json())
      .then(data => {
        setEmployees(data)
        setIsLoading(false)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    setFormLoading(true)

    const formData = new FormData()

    formData.append('name', name.value)
    formData.append('email', email.value)
    formData.append('position', position.value)

    fetch(API_URI, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => console.log(data))
  }

  const handleNameInput = (e) => {
    const value = e.target.value,
      isError = value.length === 0,
      invalidFeedback = isError ? "Can't be blank" : '';
    
    setName({
      value: value,
      isError: isError,
      invalidFeedback: invalidFeedback
    })
  }

  const handleEmailInput = (e) => {
    const value = e.target.value,
      isError = value.length === 0,
      invalidFeedback = isError ? "Can't be blank" : '';
    
    setEmail({
      value: value,
      isError: isError,
      invalidFeedback: invalidFeedback
    })
  }

  const handlePositionInput = (e) => {
    const value = e.target.value,
      isError = value.length === 0,
      invalidFeedback = isError ? "Can't be blank" : '';
    
    setPosition({
      value: value,
      isError: isError,
      invalidFeedback: invalidFeedback
    })
  }

  return (
    <>
      <div className="container">
        <h1>Employees</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? <TableLoader /> : <TableData data={employees} />}
          </tbody>
          { !isLoading && <Tfoot modal={modal} /> }
        </table>
      </div>

      <div className="modal" ref={modalRef} id="modalin" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add new employee</h3>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    className={name.isError ? 'form-control is-invalid' : 'form-control'}
                    onInput={handleNameInput}
                    value={name.value} />
                  <div className="invalid-feedback">{name.invalidFeedback}</div>
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input type="email"
                    className={email.isError ? 'form-control is-invalid' : 'form-control'}
                    onInput={handleEmailInput}
                    value={email.value} />
                  <div className="invalid-feedback">{email.invalidFeedback}</div>
                </div>
                <div className="mb-3">
                  <label>Position</label>
                  <input type="text"
                    className={position.isError ? 'form-control is-invalid' : 'form-control'}
                    onInput={handlePositionInput}
                    value={position.value} />
                  <div className="invalid-feedback">{position.invalidFeedback}</div>
                </div>
                <div className="mb-3">
                  <button type="submit" className="btn btn-primary me-2">
                    {formLoading ? <Spinner /> : 'Save'}
                  </button>
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
