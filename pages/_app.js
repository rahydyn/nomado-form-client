import { useState } from "react"
// import { SessionProvider } from "next-auth/react"
import { UserContext } from "../context/UserContext"

import "../styles/globals.css";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps:{session, ...pageProps} }) {
  const [user, setUser] = useState(null)
  return (
    // <SessionProvider session={session}>
      <UserContext.Provider value={{user, setUser}}>
      <Component {...pageProps} />
      </UserContext.Provider>
    // </SessionProvider>
      );
}

export default MyApp;
