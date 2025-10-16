import React from 'react'
const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark sticky-top">
      <div className="container">
        <a className="navbar-brand" href="#">Agenda</a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#form">Nuevo contacto</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#tabla">Contactos</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
