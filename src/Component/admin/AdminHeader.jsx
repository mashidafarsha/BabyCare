import React from 'react'
import { Navbar } from 'flowbite-react'
import { Button } from 'flowbite-react'

function AdminHeader() {
    return (
        <div>
            <Navbar
                fluid={true}
                rounded={true}
            >
                <Navbar.Brand href="https://flowbite.com/">
                    <img
                        src="https://i.pinimg.com/564x/29/79/09/297909ab644d29872eca2fb7ed882283.jpg"
                        className="mr-3 h-6 sm:h-9"
                        alt="Flowbite Logo"
                    />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                BABY CARE
                    </span>
                </Navbar.Brand>
                <div className="flex md:order-2">
                    <Button>
                        Logout
                    </Button>
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    <Navbar.Link
                        href="/navbars"
                        active={true}
                    >
                        Home
                    </Navbar.Link>
                    <Navbar.Link href="/navbars">
                        New Doctors
                    </Navbar.Link>
                    <Navbar.Link href="/navbars">
                        All Doctors
                    </Navbar.Link>
                    <Navbar.Link href="/navbars">
                        Users
                    </Navbar.Link>
                    <Navbar.Link href="/navbars">
                        Category
                    </Navbar.Link>
                    <Navbar.Link href="/navbars">
                        Our Plans
                    </Navbar.Link>
                    <Navbar.Link href="/navbars">
                        All Appointment
                    </Navbar.Link>
                    <Navbar.Link href="/navbars">
                        Chat
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>


        </div>


    )

}

export default AdminHeader