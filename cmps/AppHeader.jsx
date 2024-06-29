
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
            <h3><img className="logo" src='./assets/img/Logo.png' /></h3>
        </Link>
        <nav>
            <NavLink className="nav" to="/"><i className="fa fa-solid fa-house"></i></NavLink>
            <NavLink className="nav" to="/about"><i className="fa fa-solid fa-question"></i></NavLink>
            <NavLink to="/mail"><i className="fa fa-regular fa-envelope"></i></NavLink>
            <NavLink to="/note"><i className="fa fa-regular fa-note-sticky"></i></NavLink>
        </nav>
    </header >
}
