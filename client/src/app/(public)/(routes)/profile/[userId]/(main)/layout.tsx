import { ProfileLayout } from "@/components/layout";
import { getUserById } from "@/services";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";


interface ILayoutProps {
    params: {
        userId:string
    }
}

const Layout = async ({params, children}:PropsWithChildren<ILayoutProps>) => {
    const user = await getUserById(params.userId)
    if(!user) return notFound()
    return <ProfileLayout user={user}>{children}</ProfileLayout>
};

export default Layout;
