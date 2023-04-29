import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { DataProvider } from "@/store/globalState";
import connectDB from "@/utils/connectDB";

export default function App({ Component, pageProps }) {
    return (
        <DataProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </DataProvider>
    );
}
