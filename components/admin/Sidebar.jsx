import React, { useContext } from "react"
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react"
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
    UsersIcon,
} from "@heroicons/react/24/solid"
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useRouter } from "next/router"
import { DataContext } from "@/store/globalState"
import Cookies from "js-cookie"

const Sidebar = () => {
    const router = useRouter()
    const [state, dispatch] = useContext(DataContext)

    const handleLogout = (e) => {
        e.preventDefault()
        Cookies.remove("refresh_token", { path: "api/auth/accessToken" })
        localStorage.removeItem("firstLogin")
        dispatch({ type: "AUTH", payload: {} })
        dispatch({ type: "NOTIFY", payload: { success: "Logged out." } })

        return router.push("/")
    }

    const [open, setOpen] = React.useState(0)
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value)
    }

    return (
        <Card className='fixed top-0 left-0 h-[calc(100vh-2rem)] w-full max-w-[16rem] p-4 shadow-xl shadow-blue-gray-900/5     '>
            <div className='mb-2 p-4'>
                <Link href={"/admin"}>
                    <p className='text-blue-gray-900 font-bold text-lg'>
                        Admin
                    </p>
                </Link>
            </div>
            <List>
                <Accordion
                    open={open === 1}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${
                                open === 1 ? "rotate-180" : ""
                            }`}
                        />
                    }
                >
                    <ListItem className='p-0' selected={open === 1}>
                        <AccordionHeader
                            onClick={() => handleOpen(1)}
                            className='border-b-0 p-3'
                        >
                            <ListItemPrefix>
                                <PresentationChartBarIcon className='h-5 w-5' />
                            </ListItemPrefix>
                            <Typography
                                color='blue-gray'
                                className='mr-auto font-normal'
                            >
                                Dashboard
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    {/* <AccordionBody className='py-1'>
                        <List className='p-0'>
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon
                                        strokeWidth={3}
                                        className='h-3 w-5'
                                    />
                                </ListItemPrefix>
                                Analytics
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon
                                        strokeWidth={3}
                                        className='h-3 w-5'
                                    />
                                </ListItemPrefix>
                                Reporting
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon
                                        strokeWidth={3}
                                        className='h-3 w-5'
                                    />
                                </ListItemPrefix>
                                Projects
                            </ListItem>
                        </List>
                    </AccordionBody> */}
                </Accordion>
                <Accordion
                    open={open === 2}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${
                                open === 2 ? "rotate-180" : ""
                            }`}
                        />
                    }
                >
                    <ListItem className='p-0' selected={open === 2}>
                        <AccordionHeader
                            onClick={() => handleOpen(2)}
                            className='border-b-0 p-3'
                        >
                            <ListItemPrefix>
                                <ShoppingBagIcon className='h-5 w-5' />
                            </ListItemPrefix>
                            <Typography
                                color='blue-gray'
                                className='mr-auto font-normal'
                            >
                                E-Commerce
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className='py-1'>
                        <List className='p-0'>
                            <Link href={"/admin/orders"}>
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className='h-3 w-5'
                                        />
                                    </ListItemPrefix>
                                    Orders
                                </ListItem>
                            </Link>
                            <Link href={"/admin/products"}>
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className='h-3 w-5'
                                        />
                                    </ListItemPrefix>
                                    Products
                                </ListItem>
                            </Link>
                        </List>
                    </AccordionBody>
                </Accordion>
                <hr className='my-2 border-blue-gray-50' />
                <Link href={"/admin/messenger"}>
                    <ListItem>
                        <ListItemPrefix>
                            <InboxIcon className='h-5 w-5' />
                        </ListItemPrefix>
                        Inbox
                        <ListItemSuffix>
                            <Chip
                                value='14'
                                size='sm'
                                variant='ghost'
                                color='blue-gray'
                                className='rounded-full'
                            />
                        </ListItemSuffix>
                    </ListItem>
                </Link>
                <ListItem>
                    <ListItemPrefix>
                        <UserCircleIcon className='h-5 w-5' />
                    </ListItemPrefix>
                    Profile
                </ListItem>

                <ListItem>
                    <ListItemPrefix>
                        <UsersIcon className='h-5 w-5' />
                    </ListItemPrefix>
                    Users
                </ListItem>
                <ListItem onClick={handleLogout}>
                    <ListItemPrefix>
                        <Cog6ToothIcon className='h-5 w-5' />
                    </ListItemPrefix>
                    Log Out
                </ListItem>
            </List>
        </Card>
    )
}

export default Sidebar
