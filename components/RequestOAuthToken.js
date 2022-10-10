import { useState } from "react";
import GoogleButton from "react-google-button";

export const RequestOAuthToken = () => {
  const [buttonValue, setButtonValue] = useState("Request OAtuth2 Token");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const requestToken = () => {
    setIsLoading(!isLoading);
    setButtonValue("Loading...");
    console.log(data);
    console.log(access_token);
  };
  const openGoogleLoginPage = useCallback(() => {
    const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const redirectUri = "api/v1/auth/login/google/";

    const scope = [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" ");

    const params = {
      response_type: "code",
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      redirect_uri: `${process.env.NEXT_PUBLIC_RESTAPI_URL}/${redirectUri}`,
      prompt: "select_account",
      access_type: "offline",
      scope,
    };

    const urlParams = new URLSearchParams(params).toString();
    setIsSignedIn(true);
    window.location = `${googleAuthUrl}?${urlParams}`;
  }, []);

  if (isSignedIn) {
    return (
      <div className="flex flex-col">
        Signed in <br />
        <button
          disabled={isLoading}
          onClick={requestToken}
          className="bg-gray-100 text-black rounded-md p-2 m-4"
        >
          {buttonValue}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      Not signed in <br />
      <GoogleButton
        onClick={openGoogleLoginPage}
        className="bg-gray-500 text-white rounded-md p-2 m-4"
      />
    </div>
  );
};
