import { eventBusService } from "../services/event-bus.service.js"

const { useEffect } = React
const { Link, NavLink, useNavigate } = ReactRouterDOM

export function AppHeader() {
    const navigate = useNavigate()
    useEffect(() => {
        return () => {
        }
    }, [])

    return <header className="app-header">
        <Link to="/">
            <h3><img className="logo" src='./assets/img/Logo.png'/></h3>
        </Link>
        <nav>
            <NavLink className="nav" to="/">Home</NavLink>
            <NavLink className="nav" to="/about">About</NavLink>
            <NavLink to="/mail"><img className='logo-gmail nav' src="./assets/img/logo-gmail.png"/></NavLink>
            <NavLink to="/note"><img className='logo-keep nav' src="./assets/img/logo-keep.png"/></NavLink>
        </nav>
    </header>
}
