import { useCallback, useEffect, useContext } from "react";
import { useRouter } from "next/router";

// import { GoogleLogin } from "@react-oauth/google";
import GoogleButton from "react-google-button";
import { useSession, signIn, signOut } from "next-auth/react"

import { UserContext } from "../context/UserContext";
import { validateTokenAndObtainSession} from "../utils/validateTokenAndObtainSession"
import { notifyError } from "../utils/notifications";

export default function Auth() {
  const HOME_URL = "/";
  const router = useRouter();
  // const history = useHistory();
  const setUser = useContext(UserContext);

  useEffect(() => {
    const queryParams = new URLSearchParams(router.query);
    const error = queryParams.get("error");
    if (error) {
      notifyError(error);
      // history.replaceState({ search: null });
      router.replace({ search: null });
    }
  }, [router]);

  const handleUserInit = useCallback(
    (resp) => {
      if (resp.ok) {
        setUser(resp.data);
        router.push(HOME_URL);
        // history.pushState(HOME_URL);
      } else {
        notifyError(resp.data[0]);
      }
    },
    [router, setUser]
  );

  const onGoogleLoginSuccess = useCallback(
    (response) => {
      console.log("onGoogleLoginSuccess Func")
      const idToken = response.tokenId;
      const data = {
        email: response.profileObj.email,
        first_name: response.profileObj.givenName,
        last_name: response.profileObj.familyName,
      };
      validateTokenAndObtainSession({ data, idToken })
        .then(handleUserInit)
        .catch(notifyError);
    },
    [handleUserInit]
  );

  const openGoogleLoginPage = useCallback(() => {
    const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const redirectUri = 'api/v1/auth/login/google/';


    const scope = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
      "https://www.googleapis.com/auth/forms.body.readonly",
      "https://www.googleapis.com/auth/forms.responses.readonly"
    ].join(' ');

    const params = {
      response_type: 'code',
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      redirect_uri: `${process.env.NEXT_PUBLIC_RESTAPI_URL}/${redirectUri}`,
      prompt: 'select_account',
      access_type: 'offline',
      scope
    };

    const urlParams = new URLSearchParams(params).toString();

    window.location = `${googleAuthUrl}?${urlParams}`;
  }, []);
  

  // const { data: session } = useSession()
  // console.log(session)

  // useEffect(() => {
  //   if(session){
  //     router.push("main-page")
  //   }
  // }, [session])


  return (
    <>
      <div className="w-full max-w-md space-y-8">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="mx-auto h-6 w-auto"
            src="/header_logo.png"
            alt="Our Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            Please sign in with Google account
          </h2>
        </div>
        <div className="flex flex-col justify-center items-center">
          <GoogleButton 
          onClick={openGoogleLoginPage}
          label="Sign in with Google!!"
          />
        </div>
      </div>
    </>
  );
}
