import { useEffect, useState } from "react";
import { useLogout, useUser } from "@thirdweb-dev/react";
import { getUser } from "../../auth.config";
import styles from "../../styles/Home.module.css";
import { Button, Form, Input, Spin } from 'antd';
import { useRouter } from "next/router";

export default function Home() {
  const { isLoggedIn, isLoading } = useUser();
  const router = useRouter();
  const [ nftLoading, setNftLoading ] = useState(false);
  const [ loadingContents, setLoadingContents ] = useState(false);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoading, isLoggedIn, router]);

  const onFinish = async (values) => {
    setNftLoading(true);
    const res = await fetch('/api/thirdweb/transfer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({to: values.address, tokenId: values.token_id, seats: values.seats})
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
      <h1 className={styles.h1}>Transfer you reservation</h1>
      {nftLoading ? loadingContents :
        <Form
          name="basic"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 30 }}
          style={{ maxWidth: 1000 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="To Wallet Address"
            name="address"
            rules={[{ required: true, message: 'Please input wallet address' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Token ID"
            name="token_id"
            rules={[{ required: true, message: 'Please input token id' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Seats"
            name="seats"
            rules={[{ required: true, message: 'Please input number of seats' }]}
          >
            <Input />
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

  // Finally, return the props
  return {
    props: {},
  };
}
