import Layout from "@/components/Layout"
import "@/styles/globals.css"
import { DataProvider } from "@/store/globalState"
import { ToastContainer } from "react-toastify"
import toast, { Toaster } from "react-hot-toast"
import "react-toastify/dist/ReactToastify.css"

export default function App({ Component, pageProps }) {
    return (
        <DataProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
            <ToastContainer
                position='top-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
            />
            <Toaster position='bottom-center' reverseOrder={true} />
        </DataProvider>
    )
}
