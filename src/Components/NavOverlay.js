import { Link } from 'react-router-dom';

function NavOverlay(props) {
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
        props.setOpen(false);
    }

    return (
        <section className="nav-container-overlay">
            <nav className="nav-overlay">
                <Link to="/" className="nav-item-overlay" onClick={scrollToTop}>HOME</Link>
                <Link to="/about" className="nav-item-overlay" onClick={scrollToTop}>ABOUT</Link>
                <Link to="/menu" className="nav-item-overlay" onClick={scrollToTop}>MENU</Link>
                <Link to="/reservations" className="nav-item-overlay" onClick={scrollToTop}>RESERVATIONS</Link>
                <Link to="/order-online" className="nav-item-overlay" onClick={scrollToTop}>ORDER ONLINE</Link>
                <Link to="/login" className="nav-item-overlay" onClick={scrollToTop}>LOGIN</Link>
            </nav>
        </section>
    );
}

export default NavOverlay;