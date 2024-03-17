import { Container, Navbar, Nav, NavDropdown, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/icon-ecommerce.svg";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCredentials } from "../slices/authSlice";
import { resetCart } from "../slices/cartSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";
import SearchBox from "./SearchBox";

function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      await logout().unwrap();
      dispatch(clearCredentials(null));
      dispatch(resetCart());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header>
      <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="eCommerce" style={{ width: "55px" }} />{" "}
              eCommerce
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <SearchBox />

              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge
                      pill
                      bg="success"
                      style={{
                        position: "relative",
                        top: "-10px",
                      }}
                    >
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name}>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser />
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin">
                  <LinkContainer to="/admin/users">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/products">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/orders">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
