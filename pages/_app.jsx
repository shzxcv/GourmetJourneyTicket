import { ThirdwebProvider } from "@thirdweb-dev/react";
import { domainName } from "../const/yourDetails";
import "../styles/globals.css";
import AllLayout from '../components/Layout'

// This is the chain your dApp will work on.
const activeChain = "mumbai";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      activeChain={activeChain}
      authConfig={{
        domain: domainName,
        authUrl: "/api/auth",
      }}
    >
      <AllLayout>
        <Component {...pageProps} />
      </AllLayout>
    </ThirdwebProvider>
  );
}

export default MyApp;
