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

const register = () => {
    return (
        <div className='flex flex-1 items-center justify-center mt-8'>
            <Head>
                <title>Sign Up Page</title>
            </Head>
            <Card className='w-96'>
                <CardHeader
                    variant='gradient'
                    color='teal'
                    className='mb-4 grid h-28 place-items-center'
                >
                    <Typography variant='h3' color='white'>
                        Sign Up
                    </Typography>
                </CardHeader>
                <CardBody className='flex flex-col gap-4'>
                    <Input label='Full Name' size='lg' />
                    <Input label='Username' size='lg' />
                    <Input label='Password' size='lg' />
                </CardBody>
                <CardFooter className='pt-0'>
                    <Button color='cyan' variant='gradient' fullWidth>
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
                </CardFooter>
            </Card>
        </div>
    );
};

export default register;
