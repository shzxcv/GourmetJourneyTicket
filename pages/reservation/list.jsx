import { useEffect } from "react";
import { useLogout, useUser } from "@thirdweb-dev/react"; import { getUser } from "../../auth.config";
import styles from "../../styles/Home.module.css";
import { Table, DatePicker, Button } from 'antd';
import { useRouter } from "next/router";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

export default function Home({tokens}) {
  const { logout } = useLogout();
  const { isLoggedIn, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoading, isLoggedIn, router]);

  const columns = [
    {
      title: 'page',
      key: 'page',
      render: (text, record) => (
        <Button type="link" href={`https://testnets.opensea.io/ja/assets/mumbai/0x2d851ee8c7804119fc0a5807a5b8619078f32d32/${record.tokenID}`}>
          OpenSea Page
        </Button>
      ),
    },
  ]

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Reservation List</h1>
      <Table columns={columns} dataSource={tokens} />

      <button className={styles.mainButton} onClick={logout}>
        Logout
      </button>
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

  const client = new ApolloClient({
    uri: 'https://api.studio.thegraph.com/query/45447/ethglobalproduction/v0.0.1',
    cache: new InMemoryCache(),
  });

  // user毎のデータに絞る
  const { data } = await client.query({
    query: gql`
      query Tokens {
        tokens {
          tokenID
          owner {
            id
          }
        }
      }
    `,
  });

  // Finally, return the props
  return {
    props: {
      tokens: data.tokens,
    },
  };
}

