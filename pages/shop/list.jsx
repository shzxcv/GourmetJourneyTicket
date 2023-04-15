import { useEffect } from "react";
import { useLogout, useUser } from "@thirdweb-dev/react"; import { getUser } from "../../auth.config";
import styles from "../../styles/Home.module.css";
import { Table, DatePicker, Button } from 'antd';
import { useRouter } from "next/router";
import prisma from "../../util/prisma";

export default function Home({shops}) {
  const { isLoggedIn, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoading, isLoggedIn, router]);

  const columns = [
    {
      title: 'Shop Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Shop URL',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: 'Detail page',
      key: 'page',
      render: (text, record) => (
        <Button type="link" href={`/shop/${record.id}`}>
          reservation
        </Button>
      ),
    },
  ]

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Shop list</h1>
      <Table columns={columns} dataSource={shops} />
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

  // get shops
  const shops = await prisma.shops.findMany({
    select: {
      id: true,
      name: true,
      url: true,
      seats: true,
    }
  });

  // Finally, return the props
  return {
    props: {
      shops: shops,
    },
  };
}
