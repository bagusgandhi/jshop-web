"use client";
import {
  AppstoreOutlined,
  DollarOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import { Button, Divider, Drawer, Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="sticky top-0 z-999">
      <div className="flex justify-between items-center bg-primary h-full py-4 lg:px-60 px-4 text-white">
        <h1 className="font-bold text-xl lg:px-4">JSHOP</h1>
        <div className="lg:hidden block">
          <AppstoreOutlined onClick={showDrawer} style={{ fontSize: "24px" }} />
        </div>
      </div>
      <div className="hidden lg:block">
        <div className="lg:px-60 w-full bg-white">
          <Menu
            mode="horizontal"
            selectedKeys={[pathname]}
            items={[
              {
                key: "/products",
                icon: <ProductOutlined />,
                label: <Link href="/products">Products</Link>,
              },
              {
                key: "/adjustment-transaction",
                icon: <DollarOutlined />,
                label: (
                  <Link href="/adjustment-transaction">
                    Adjusment Transaction
                  </Link>
                ),
              },
            ]}
            style={{
              flex: 1,
              borderLeft: "1px solid #eee",
              borderRight: "1px solid #eee",
            }}
          />
        </div>
      </div>

      <Drawer onClose={onClose} open={open}>
        <div className="flex flex-col text-lg gap-4">
          <Link href={"/products"} onClick={onClose}>
            Products
          </Link>
          <Link href={"/adjustment-transaction"} onClick={onClose}>
            Adjusment Transaction
          </Link>
        </div>
      </Drawer>
    </div>
  );
}
