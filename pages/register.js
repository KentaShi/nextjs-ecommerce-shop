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
                <Typography variant='h3' color='teal'>
                    Sign Up
                </Typography>
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-4 mt-8 mb-2 w-80 max-w-screen-lg'
                >
                    <Input
                        label='Full Name'
                        size='lg'
                        name='fullName'
                        value={fullName}
                        onChange={handleChangeInput}
                    />
                    <Input
                        label='Username'
                        size='lg'
                        name='username'
                        value={username}
                        onChange={handleChangeInput}
                    />
                    <Input
                        label='Password'
                        size='lg'
                        name='password'
                        type='password'
                        value={password}
                        onChange={handleChangeInput}
                        autoComplete='on'
                    />
                    <Input
                        label='Confirm Password'
                        size='lg'
                        name='confirmPassword'
                        type='password'
                        value={confirmPassword}
                        onChange={handleChangeInput}
                        autoComplete='on'
                    />
                    <Button
                        color='cyan'
                        variant='gradient'
                        type='submit'
                        fullWidth
                    >
                        Sign Up
                    </Button>

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
                                color='blue'
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
