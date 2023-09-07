import React from "react";
import { NavbarBrand, NavbarText, Navbar, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../redux/actions/user";

function myNavbar(props) {
    return (
        <div>
            <Navbar color="light" light>
                <NavbarBrand>Event management</NavbarBrand>
                <Nav>
                    {
                        props.userGlobal.username ?
                            <>
                                <NavItem style={{ marginTop: 9 }}>
                                    <NavbarText >Hello, {props.userGlobal.username}</NavbarText>
                                </NavItem>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        pages
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            <Link to="/search">Search</Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link to="/register">register</Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link to="/login">login</Link>
                                        </DropdownItem>
                                        {
                                            props.userGlobal.role === "admin" ?
                                                <DropdownItem>
                                                    <Link to="/admin">Admin</Link>
                                                </DropdownItem>
                                                : null
                                        }

                                        <DropdownItem divider />
                                        <DropdownItem onClick={props.logoutUser}>
                                            <Link>Logout</Link>
                                        </DropdownItem>

                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </>
                            :
                            <NavItem>
                                <NavbarText>
                                    <Link to='/login'> Login </Link> | <Link to='/register'> Register </Link>
                                </NavbarText>
                            </NavItem>
                    }

                </Nav>
            </Navbar>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userGlobal: state.user
    }
}

const mapDispatchToProps= {
    logoutUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(myNavbar)