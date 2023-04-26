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

const login = () => {
    return (
        <div className='flex flex-1 items-center justify-center mt-8'>
            <Head>
                <title>Login Page</title>
            </Head>
            <Card className='w-96'>
                <CardHeader
                    variant='gradient'
                    color='teal'
                    className='mb-4 grid h-28 place-items-center'
                >
                    <Typography variant='h3' color='white'>
                        Sign In
                    </Typography>
                </CardHeader>
                <CardBody className='flex flex-col gap-4'>
                    <Input label='Email' size='lg' />
                    <Input label='Password' size='lg' />
                    <div className='-ml-2.5'>
                        <Checkbox label='Remember Me' />
                    </div>
                </CardBody>
                <CardFooter className='pt-0'>
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
                                Sign up
                            </Typography>
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default login;
