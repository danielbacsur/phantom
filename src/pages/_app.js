import "../styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="w-screen h-screen overflow-x-hidden overflow-y-auto bg-white">
      <div className="w-screen h-full font-karla text-black">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
