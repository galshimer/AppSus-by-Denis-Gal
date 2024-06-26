const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
            <h3><img className="logo" src='./assets/img/Logo.png'/></h3>
        </Link>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail"><img className='logo-gmail' src="./assets/img/logo-gmail.png"/></NavLink>
            <NavLink to="/note"><img className='logo-keep' src="./assets/img/logo-keep.png"/></NavLink>
        </nav>
    </header>
}
