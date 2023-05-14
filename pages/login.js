import Head from "next/head"
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
} from "@material-tailwind/react"
import Link from "next/link"
import { useState, useContext, useEffect } from "react"
import { DataContext } from "@/store/globalState"
import { postData } from "@/utils/fetchData"
import Cookies from "js-cookie"
import { useRouter } from "next/router"

const login = () => {
    const initState = {
        username: "",
        password: "",
    }
    const [userData, setUserData] = useState(initState)
    const { username, password } = userData

    const [state, dispatch] = useContext(DataContext)
    const { auth } = state

    const router = useRouter()

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        dispatch({ type: "NOTIFY", payload: { loading: true } })

        const res = await postData("auth/login", userData)
        if (res.err) {
            return dispatch({
                type: "NOTIFY",
                payload: { error: res.err },
            })
        }
        dispatch({ type: "NOTIFY", payload: { success: res.msg } })

        dispatch({
            type: "AUTH",
            payload: { token: res.access_token, user: res.user },
        })

        Cookies.set("refresh_token", res.refresh_token, {
            path: "api/auth/accessToken",
            expires: 7,
        })

        localStorage.setItem("firstLogin", true)
    }

    useEffect(() => {
        if (Object.keys(auth).length !== 0) router.back()
    }, [auth])
    return (
        <div className='flex flex-1 justify-center h-[380px]'>
            <Head>
                <title>Đăng Nhập | AnhAnh Nè</title>
            </Head>
            <Card className='w-96 p-8'>
                <p className='text-coca-darkest font-extrabold text-3xl'>
                    Đăng Nhập
                </p>
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-4 mt-8 mb-2 w-80 max-w-screen-lg'
                >
                    <Input
                        color='brown'
                        label='Username'
                        size='lg'
                        name='username'
                        value={username}
                        onChange={handleChangeInput}
                    />
                    <Input
                        color='brown'
                        label='Password'
                        size='lg'
                        type='password'
                        name='password'
                        value={password}
                        onChange={handleChangeInput}
                    />
                    <button
                        type='submit'
                        className='bg-coca-medium text-white rounded-lg py-2 hover:shadow-lg hover:shadow-coca-medium transition duration-200 uppercase font-semibold'
                    >
                        Đăng Nhập
                    </button>

                    <div className='flex flex-row items-center justify-center mt-6'>
                        <Typography
                            variant='small'
                            className='flex justify-center'
                        >
                            Bạn chưa có tài khoản?
                        </Typography>
                        <Link href={"/register"}>
                            <Typography
                                variant='small'
                                color='brown'
                                className='ml-1 font-bold'
                            >
                                Đăng Ký
                            </Typography>
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    )
}

export default login
