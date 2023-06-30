"use client"

import { SessionProvider } from "next-auth/react";
import React from "react";

// SessionProvider precisa ser client side, por isso a necessidade de criar um AuthProvider e englobar o children
const AuthProvider = ({ children }: any) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;