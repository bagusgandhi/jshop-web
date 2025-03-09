import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Header from "@/components/ui/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "JSHOP",
  description: "Manage Product & Stock Easily",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#4361ee",
              },
              components: {
                Menu: {
                  itemActiveBg: "#4361ee",
                  itemSelectedBg: "#4361ee",
                  itemSelectedColor: "#ffffff",
                },
                Layout: {
                  headerBg: "#ffffff",
                },
                Button: {
                  colorPrimary: "#4361ee",
                  colorPrimaryBg: "#4361ee",
                  algorithm: true,
                  defaultBg: "#eeeeee",
                  defaultHoverBg: "#000000",
                  defaultHoverColor: "#ffffff",
                  defaultHoverBorderColor: "#000000",
                  defaultColor: "#000000",
                  colorLink: "#4361ee",
                },
                Input: {
                  colorPrimary: "#4361ee",
                  algorithm: true, // Enable algorithm
                },
              },
            }}
          >
            <Layout>
              <Header />
              <Content style={{width: "100%" }}>
                <div className="lg:px-64  px-4 py-6">{children}</div>
              </Content>
            </Layout>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
