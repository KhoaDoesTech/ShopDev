import { ReactNode } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
interface HomeLayoutProps {
  children: ReactNode;
}
function HomeLayout(props: HomeLayoutProps) {
  return (
    <div className="w-[calc(100vw-15px)] h-full">
      <Header />
      <main className="min-h-screen h-full ">{props.children}</main>
      <Footer />
    </div>
  );
}

export default HomeLayout;
