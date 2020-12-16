import headerLogo from "../images/logo.svg";

function Header() {
  return (
    <header className="header root__section">
      <img src={headerLogo} alt="Логотип" className="logo" />
    </header>
  );
}
export default Header;
