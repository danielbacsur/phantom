import "../styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="w-screen h-screen bg-white text-black font-karla overflow-y-auto overflow-x-hidden">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
