import "../css/Header.css"
import Logo from "./Logo"

function Header() {
    return (
        <div className="header">
            <h1 id="title">Votre liste de TODOs <Logo className="App-logo" />
            </h1>
        </div>
    )
}

export default Header;