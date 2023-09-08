import React from "react";
import {
  NavbarBrand,
  NavbarText,
  Navbar,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../redux/actions/user";

function MyNavbar(props) {
  const handleLogout = () => {
    props.logoutUser();
  };

  return (
    <div>
      <Navbar color="light" light>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <NavbarBrand>Doodoos Events Management</NavbarBrand>
            <Nav>
              {props.userGlobal.username ? (
                <>
                  <NavItem style={{ marginTop: 9 }}>
                    <NavbarText>
                      Hello, my friend{" "}
                      <span style={{ color: "blue" }}>
                        {props.userGlobal.username}
                      </span>
                    </NavbarText>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      <i className="fas fa-bars"></i> {}
                    </DropdownToggle>
                    <DropdownMenu right>
                      {props.userGlobal.role === "admin" ? (
                        <DropdownItem>
                          <Link to="/admin">Admin</Link>
                        </DropdownItem>
                      ) : (
                        <>
                          <DropdownItem>
                            <Link to="/profile">Profile</Link>
                          </DropdownItem>
                          <DropdownItem>
                            <Link to="/carts">Carts</Link>
                          </DropdownItem>
                          <DropdownItem>
                            <Link to="/account-settings">Account Settings</Link>
                          </DropdownItem>
                        </>
                      )}
                      <DropdownItem divider />
                      {}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </>
              ) : (
                <NavItem style={{ marginLeft: "auto" }}>
                  <NavbarText>
                    <Link to="/login"> Login </Link> |{" "}
                    <Link to="/register"> Register </Link>
                  </NavbarText>
                </NavItem>
              )}
            </Nav>
          </div>
          {props.userGlobal.username ? (
            <Link to="/" style={{ textDecoration: "none" }}>
              <button
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={handleLogout}
              >
                Log Out
              </button>
            </Link>
          ) : null}
        </div>
      </Navbar>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar);
