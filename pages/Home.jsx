const { Link} = ReactRouterDOM

export function Home() {
    return <section className="home">
        <h1>Welcome to  our home page!</h1>
        <img className="logo" src="./assets/img/Logo.png"/>
        <h2> Which app would you like to choose?</h2>
        <div className="navigation-links">
                <Link to="/mail" className="nav-link"><img className='logo-gmail home-logo' src="./assets/img/logo-gmail.png"/></Link>
                <Link to="/note" className="nav-link"><img className='logo-keep home-logo' src="./assets/img/logo-keep.png"/></Link>
            </div>
    </section>
}