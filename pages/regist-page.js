import Layout from "../components/Layout";
import Link from "next/link";
import { useState, useContext } from "react";

import { GoogleFormsView } from "../components/GoogleFormsView";
import { UserContext } from "../context/UserContext"
import { post } from "../utils/sdk"

// SSG + ISR

export default function BlogPage({ filteredPosts }) {
  const { user, setUser } = useContext(UserContext)
  const [formsContent, setFormsContent] = useState({});
  const [register, setRegister] = useState(false);
  const [formId, setFormId] = useState("")

  const registFormsContent = async () => {
    // TODO:api処理
    const reqData = {
      formId: formId,
      userId: user.id,
      email: user.email
    }
    await post("forms/init/", reqData)
    .then((res) => {
      setFormsContent(res);
      return res
    })
    .then((r) => {
      setRegister(true);
      // router.push(`/regist-page`)
    })
  };
  return (
    <Layout title="Regist page">
      {register ? (
        <GoogleFormsView formsContent={formsContent} />
      ) : (
        // filteredPosts.map((post) => <Post key={post.id} post={post} />)
        <div className="flex justify-center flex-col items-center">
          <p className="my-4">Input Goodle Forms Sharing URL</p>
          <input
            className="text-gray-700 my-4"
            onChange={(e) => {
              const id = String(e.target.value).split("/")
              setFormId(id[5])
            }}
          ></input>
          <button className="bg-indigo-500 my-4" onClick={registFormsContent}>
            Regist
          </button>
        </div>
      )}

      <Link href="/main-page">
        <div className="flex cursor-pointer mt-12">
          <svg
            className="w-6 h-6 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            ></path>
          </svg>
          <span>Back to main page</span>
        </div>
      </Link>
    </Layout>
  );
}
