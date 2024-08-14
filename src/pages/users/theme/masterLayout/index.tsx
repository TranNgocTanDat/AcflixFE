
import React, {ReactNode} from 'react'
import Header from '../../theme/header/Header';
import Footer from '../footer/Footer';

interface MasterLayoutProps {
    children: ReactNode;
    [key: string]: any; // Kiểu cho các prop bổ sung khác
}


const MasterLayout: React.FC<MasterLayoutProps> = ({ children }) => {
    return(
        <div>
        <Header />   
       {children}
        <Footer/>
        </div>
    )
}

export default MasterLayout