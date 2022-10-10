import { useRouter } from "next/router"
import { ToastContainer } from "react-nextjs-toast";

import Auth from "../components/Auth";
import Layout from "../components/Layout";


export default function Home() {
  const router = useRouter()

  // TODO: 
  // if (cookie) router.push("main-page")


  return (
    <>
      <Layout title="Login">
        <Auth />
      </Layout>
      <ToastContainer align="right" position="bottom" />
    </>
  );
}
