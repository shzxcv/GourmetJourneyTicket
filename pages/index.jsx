import React, { useEffect } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useLogout, useUser } from "@thirdweb-dev/react";
import { getUser } from "../auth.config";
// import checkBalance from "../util/checkBalance";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Link from 'next/link'

export default function Home() {
  const { isLoggedIn, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoading, isLoggedIn, router]);

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Make your reservation at NFT right away!</h1>
      <Link href="/shop/list" className={styles.link}>
        Make a reservation from the list of stores.
      </Link>
      <Link href="/reservation/transfer" className={styles.link}>
        Transfer your reservation
      </Link>
      <Link href="/reservation/list" className={styles.link}>
        List your reservation
      </Link>
      <Link href="/shop/new" className={styles.link}>
        Are you a store owner? You can register your store.
      </Link>
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps(context) {
  const user = await getUser(context.req);

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // Finally, return the props
  return {
    props: {},
  };
}
