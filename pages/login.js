import Head from "next/head";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
} from "@material-tailwind/react";
import Link from "next/link";
import { useState } from "react";

const login = () => {
    const initState = {
        username: "",
        password: "",
    };
    const [userData, setUserData] = useState(initState);
    const { username, password } = userData;

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };
    return (
        <div className='flex flex-1 items-center justify-center mt-8'>
            <Head>
                <title>Login Page</title>
            </Head>
            <Card className='w-96 p-8'>
                <Typography variant='h3' color='teal'>
                    Sign In
                </Typography>
                <form className='flex flex-col gap-4 mt-8 mb-2 w-80 max-w-screen-lg'>
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
                        value={password}
                        onChange={handleChangeInput}
                    />
                    <Button color='cyan' variant='gradient' fullWidth>
                        Sign In
                    </Button>

                    <div className='flex flex-row items-center justify-center mt-6'>
                        <Typography
                            variant='small'
                            className='flex justify-center'
                        >
                            Don't have an account?
                        </Typography>
                        <Link href={"/register"}>
                            <Typography
                                variant='small'
                                color='blue'
                                className='ml-1 font-bold'
                            >
                                Sign Up
                            </Typography>
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default login;
