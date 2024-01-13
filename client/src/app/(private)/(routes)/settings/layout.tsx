import { constructMetadata } from "@/shared/metadata/settings";
import { Metadata } from "next";
import { PropsWithChildren } from "react";


export const metadata : Metadata = constructMetadata()

const Layout = ({children}:PropsWithChildren) => {
  return <>{children}</>;
};

export default Layout;
