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
import valid from "@/utils/valid"
import { DataContext } from "@/store/globalState"
import { postData } from "@/utils/fetchData"
import { useRouter } from "next/router"

const register = () => {
    const initState = {
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
    }
    const [userData, setUserData] = useState(initState)
    const { fullName, username, password, confirmPassword } = userData

    const [state, dispatch] = useContext(DataContext)
    const { auth } = state

    const router = useRouter()

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errMsg = valid(fullName, username, password, confirmPassword)
        if (errMsg) {
            return dispatch({ type: "NOTIFY", payload: { error: errMsg } })
        }
        dispatch({ type: "NOTIFY", payload: { loading: true } })

        const res = await postData("auth/register", userData)
        if (res.err) {
            return dispatch({
                type: "NOTIFY",
                payload: { error: res.err },
            })
        }
        return dispatch({ type: "NOTIFY", payload: { success: res.msg } })
    }

    useEffect(() => {
        if (Object.keys(auth).length !== 0) router.push("/")
    }, [auth])

    return (
        <div className='flex flex-1 justify-center h-[480px]'>
            <Head>
                <title>Sign Up Page</title>
            </Head>
            <Card className='w-96 p-8'>
                <p className='text-coca-darkest font-extrabold text-3xl'>
                    Sign Up
                </p>
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-4 mt-8 mb-2 w-80 max-w-screen-lg'
                >
                    <Input
                        color='brown'
                        label='Full Name'
                        size='lg'
                        name='fullName'
                        value={fullName}
                        onChange={handleChangeInput}
                    />
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
                        name='password'
                        type='password'
                        value={password}
                        onChange={handleChangeInput}
                        autoComplete='on'
                    />
                    <Input
                        color='brown'
                        label='Confirm Password'
                        size='lg'
                        name='confirmPassword'
                        type='password'
                        value={confirmPassword}
                        onChange={handleChangeInput}
                        autoComplete='on'
                    />
                    <button
                        type='submit'
                        className='bg-coca-medium text-white rounded-lg py-2 hover:shadow-lg hover:shadow-coca-medium transition duration-200 uppercase font-bold'
                    >
                        Sign up
                    </button>

                    <div className='flex flex-row items-center justify-center mt-6'>
                        <Typography
                            variant='small'
                            className='flex justify-center'
                        >
                            Have an account?
                        </Typography>
                        <Link href={"/login"}>
                            <Typography
                                variant='small'
                                color='brown'
                                className='ml-1 font-bold'
                            >
                                Sign In
                            </Typography>
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    )
}

export default register
