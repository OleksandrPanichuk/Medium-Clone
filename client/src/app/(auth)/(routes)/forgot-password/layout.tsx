import { constructMetadata } from "@/shared/metadata/forgot-password";
import { Metadata } from "next";
import { headers } from "next/headers";
import {PropsWithChildren} from "react";

export const generateMetadata = async ( ): Promise<Metadata> => {
  const _headers = headers()
  const url = _headers.get('referrer') ?? undefined
  return constructMetadata({url})
}

const Layout = ({children}:PropsWithChildren) => {
  return <>{children}</>;
};

export default Layout;
