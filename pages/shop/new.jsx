import { useEffect } from "react";
import { useLogout, useUser } from "@thirdweb-dev/react";
import { getUser } from "../../auth.config";
import styles from "../../styles/Home.module.css";
import { Button, Form, Input, InputNumber, TimePicker, Upload } from 'antd';
import { useRouter } from "next/router";

export default function Home() {
  const { isLoggedIn, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoading, isLoggedIn, router]);

  const onFinish = async (values) => {
    const res = await fetch('/api/shop/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: values.name, url: values.url, seats: values.seats, open_time: values.open_time, close_time: values.close_time, image_url: values.image_url})
    });
    if (res.status === 200) {
      router.push('/');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Register your store</h1>
      <Form
        name="basic"
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="URL"
          name="url"
          rules={[{ required: true, message: 'Please input url' }]}
        >
          <Input />
        </Form.Item>

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
          label="Open Time"
          name="open_time"
          rules={[{ required: true, message: 'Please input open time' }]}
        >
          <TimePicker
            format={'HH:mm'}
          />
        </Form.Item>

        <Form.Item
          label="Close Time"
          name="close_time"
          rules={[{ required: true, message: 'Please input close time' }]}
        >
          <TimePicker
            format={'HH:mm'}
          />
        </Form.Item>

        <Form.Item
          label="Image URL"
          name="image_url"
          rules={[{ required: true, message: 'Please input image url' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
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
