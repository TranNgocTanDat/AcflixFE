import React, { ReactNode } from "react";
import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";

interface MasterLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  [key: string]: any; // Kiểu cho các prop bổ sung khác
}

const MasterLayout: React.FC<MasterLayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true,
}) => {
  return (
    <div>
      <Header />
      {/* {showHeader && <Header />} */}
      {children}
      <Footer />
      {/* {showFooter && <Footer />} */}
    </div>
  );
};

export default MasterLayout;
