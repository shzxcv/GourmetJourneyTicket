import { useEffect, useState } from "react";
import { useLogout, useUser } from "@thirdweb-dev/react";
import { getUser } from "../../auth.config";
import styles from "../../styles/Home.module.css";
import { DatePicker, Form, InputNumber, Button, Spin } from 'antd';
import { useRouter } from "next/router";
import prisma from "../../util/prisma";
import moment from "moment";

export default function Home({shop}) {
  const { isLoggedIn, isLoading } = useUser();
  const [ nftLoading, setNftLoading ] = useState(false);
  const [ loadingContents, setLoadingContents ] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoading, isLoggedIn, router]);

  const onFinish = async (value) => {
    const name = shop.name
    const date = value.datetime.format("YYYY-MM-DD-HH-mm");
    const seats = value.seats;
    setNftLoading(true);
    const res = await fetch('/api/thirdweb/mint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: name, seats: seats, date: date})
    });
    if (res.status === 200) {
      console.log('success');
    }
    setNftLoading(false);
  };

  useEffect(() => {
    if (nftLoading) {
      setLoadingContents(
        <Spin tip="Loading..." />
      )
    } else {
      setNftLoading(null);
    }
  }, [nftLoading]);

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>{shop.name}</h1>
      {nftLoading ? loadingContents :
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Seats"
            name="seats"
            rules={[{ required: true, message: 'Please input number of seats' }]}
          >
            <InputNumber 
              min={1}
            />
          </Form.Item>

          <Form.Item
            label="DateTime"
            name="datetime"
            rules={[{ required: true, message: 'Please input Data time' }]}
          >
            <DatePicker
              showTime={{
                defaultValue: moment("00:00:00", "HH:mm:ss"),
                format: "HH:mm"
              }}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      }
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

  const { id } = context.query;

  // get shops
  const shop = await prisma.shops.findUnique({
    select: {
      id: true,
      name: true,
      url: true,
      seats: true,
    },
    where: {
      id: parseInt(id),
    }
  });

  // Finally, return the props
  return {
    props: {
      shop: shop,
    },
  };
}
