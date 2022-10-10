import Head from "next/head";

export default function Layout({ children, title = "Default title" }) {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-black font-mono bg-gray-200">
      <Head>
        <title>{title}</title>
      </Head>
      <main className="flex flex-1 justify-center items-center w-screen flex-col">
        {children}
      </main>
      <footer className="w-full h6 flex justify-center items-center text-gray-500 text-sm">
        <a href="https://www.tsunagaru.co.jp/">&copy;Tsunagaru, Inc.</a>
      </footer>
    </div>
  );
}
