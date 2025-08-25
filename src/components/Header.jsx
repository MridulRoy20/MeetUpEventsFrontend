import { Link } from "react-router-dom";

const Header = () => {


    return(
        <header className="bg-light">
            <div className="container">
                <nav className="navbar ">
                <Link to={"/"} className="navbar-brand">
                    <img src="https://help.meetup.com/hc/theming_assets/01HZH3ZAT7AR9TR620NM18CDKN" width="100" height="65" alt="Meetup"/>
                </Link>
                
                </nav>
                <hr/>
            </div>
            
            
        </header>
    )
}

export default Header;