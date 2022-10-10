import Link from "next/link";
import { useRouter } from "next/router";
import Cokkie from "universal-cookie";
import Layout from "../components/Layout";

import GoogleButton from "react-google-button";
import { useSession, signIn, signOut } from "next-auth/react"

import { useContext, useEffect, useCallback } from "react"

import { useUserRequired } from "../components/hooks/useUserRequired"

import { UserContext } from "../context/UserContext"

import { logout } from "../utils/logout"

// import { RequestOAuthToken } from "../components/RequestOAuthToken";

const cookie = new Cokkie();

export default function MainPage() {
  useUserRequired()
  const router = useRouter();
  const { user, setUser } = useContext(UserContext)

  const handleLogout = useCallback(() => {
      console.log("sign out1")
      logout().then((res)=>{
        console.log("sign out2")
        setUser(null)
        router.push("/")
      })
    },
    [setUser, router],
  )

  if (!user) {
    return null
  }
  

  return (
    <Layout title="Main page">
      <div className="mb-10">
        <Link href="/regist-page">
          <a className="bg-indigo-500 mr-8 hover:bg-indigo-600 text-white px-4 py-12 rounded">
            Regist Google Form Data
          </a>
        </Link>
        <Link href="/match-page">
          <a className="bg-gray-500 mr-8 hover:bg-gray-600 text-white px-4 py-12 rounded">
            Match Atenndee by Data
          </a>
        </Link>
      </div>
      <div className="my-4 p-2">
        Logged in as {user.email}
      </div>
      <GoogleButton
            // type = "light"
            onClick={() => {
              logout()
              setUser(null)
              router.push("/")
            }}
            label = {`Sign out`}
      />
    </Layout>
  );
}
