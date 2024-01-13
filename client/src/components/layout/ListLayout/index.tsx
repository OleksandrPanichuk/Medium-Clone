import { TypeBaseUser } from "@/shared/types";
import React, { PropsWithChildren } from "react";
import styles from './list.layout.module.scss'
import { Sidebar } from "@/components/screens/profile";

interface IListLayoutProps {
	user: TypeBaseUser
}
export const ListLayout = ({user, children}:PropsWithChildren<IListLayoutProps>) => {
  return <>
    <div className='flex'>
        <div className={styles.wrapper}>{children}</div>
        <Sidebar initialUser={user} />
    </div>
  </>;
};
