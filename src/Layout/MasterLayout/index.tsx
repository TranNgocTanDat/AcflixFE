import React, { ReactNode } from "react";
import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";

interface MasterLayoutProps {
  children: ReactNode;
  showHeader?: boolean; // Thuộc tính điều khiển hiển thị Header
  showFooter?: boolean; // Thuộc tính điều khiển hiển thị Footer
  [key: string]: any; // Kiểu cho các prop bổ sung khác
}

const MasterLayout: React.FC<MasterLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MasterLayout;
