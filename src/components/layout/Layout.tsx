/** @jsxImportSource @emotion/react */

import { ReactNode } from "react";
import Header from "./Header";
import { colors } from "../../constants/color";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      css={{
        width: "100%",
        height: "100vh",
        margin: "0 auto",
        border: "1px solid #ccc",
        background: `linear-gradient(0, ${colors.primary}, #fc949d)`,
      }}
    >
      <div
        css={{
          position: "relative",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
          width: "calc(100% - 40px)",
          maxWidth: "1000px",
          margin: "0 auto",
          minHeight: "90vh",
          background: "rgba(255, 255, 255, 0.4)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(5px)",
          borderRadius: "20px",
          marginTop: "5vh",
          padding: "100px 20px 20px 20px",
        }}
      >
        <Toaster
          toastOptions={{
            style: {
              padding: "10px 16px",
              fontSize: "14px",
              fontWeight: 500,
              color: colors.primary,
            },
          }}
        />
        <Header />
        <main
          css={{
            width: "100%",
            height: "100%",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
