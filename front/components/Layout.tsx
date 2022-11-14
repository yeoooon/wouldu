import NavBar from "./Navbar";

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
}
