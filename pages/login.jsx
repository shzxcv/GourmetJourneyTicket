import { useEffect } from "react";
import { useRouter } from "next/router";
import { ConnectWallet, useAddress, Web3Button } from "@thirdweb-dev/react";
import { isFeatureEnabled } from "@thirdweb-dev/sdk";
import Link from "next/link";
import { contractAddress } from "../const/yourDetails";
import styles from "../styles/Home.module.css";

export default function Login() {
  const address = useAddress(); // Get the user's address
  const router = useRouter();

  useEffect(() => {
    if (address) {
      router.push("/");
    }
  }, [address, router])

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>NFTDineReserve</h1>
      <p className={styles.explain}>
        NFT makes a great exchange of store reservations.
      </p>

      <hr className={styles.divider} />

      <>
        {address ? (
          <p>
            Welcome, {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
        ) : (
          <p>Please connect your wallet to continue.</p>
        )}

        <ConnectWallet accentColor="#F213A4" />
      </>
    </div>
  );
}
