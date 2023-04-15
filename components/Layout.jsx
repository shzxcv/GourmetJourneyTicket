import React from 'react';
import Head from "next/head";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Link } from 'antd';
import Image from 'next/image'
import { useRouter } from "next/router";
import { useLogout, useUser } from "@thirdweb-dev/react";
import styles from '../styles/Home.module.css'

const { Header, Content, Footer, Sider } = Layout;

function AllLayout({ children }) {
  const router = useRouter();
  const { logout } = useLogout();

  return (
    <div>
      <Head>
        <title>NFT Dine Reserve</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="NFT makes a great exchange of store reservations."
        />
      </Head>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <Image src="/top.png" alt="top" width={180} height={80} />
          <Menu
            style={{ height: '100vh' }}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['4']}
          >
            <Menu.Item onClick={() => router.push('/')}>
              Top
            </Menu.Item>
            <Menu.Item onClick={() => router.push('/shop/list')}>
              Shop List
            </Menu.Item>
            <Menu.Item onClick={() => router.push('/reservation/list')}>
              Reservation List
            </Menu.Item>
            <Menu.Item onClick={() => router.push('/reservation/transfer')}>
              Transfer Reservation
            </Menu.Item>
            <Menu.Item onClick={() => router.push('/shop/new')}>
              You owner?
            </Menu.Item>
            <Menu.Item onClick={logout}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content>
            { children }
          </Content>
          <Footer style={{ textAlign: 'center', width: '1500px' }}>Gourmet Journey Ticket</Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default AllLayout;
