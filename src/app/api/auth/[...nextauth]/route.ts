import NextAuth, { Account, NextAuthOptions, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";


const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 2 * 60 * 60, // 2 hours
    },
    
    providers: [
        
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            type: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },
                password: { label: "Password", type: "password" },
            },
            // @ts-ignore
            async authorize(credentials) {
                try {
                    
                    /*const userInfo = await LoginUser(
                        email: credentials.email,
                        password: credentials.password,
                    );
                    
                    if (userInfo.token) {
                        const user = {
                            id: userInfo.userId,
                            token: userInfo.token
                        }
                        return user;
                    } else {
                        throw new Error("Wrong Credentials!");
                    }*/

                    if(credentials!.email == "email" && credentials!.password == "123456" ){
                        const user = {
                            id: "67cc0ae9-7015-4903-8c0d-a1c1cac6e449",
                            accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoiNjdjYzBhZTktNzAxNS00OTAzLThjMGQtYTFjMWNhYzZlNDQ5IiwiaWF0IjoxNjg4MzE2NTcwfQ.clQQVbPbt9fnwrweOs-X7tO6UoWEKgq-GGSj--JdZzA"
                        };
                        return user;
                    } else {
                        throw new Error("Wrong Credentials!");
                    }
                    
                } catch (err: any) {
                    throw new Error(err);
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],

    // Caso dê erro, o usuario é redirecionado para a pagina de login
    pages: {
        error: "/dashboard/login",
    },

    callbacks: {
        jwt: async ({ token, user }: {
            token: JWT,
            user: AdapterUser | User | any
        }) => {
            if (user) {
                token.id = user.id;
                token.accessToken = user.accessToken;
            }
      
            return token;
        },
        async session({ session, token, user }) {

            if (token) {
                // @ts-ignore
                session.user.id = token.id;
                // @ts-ignore
                session.user.accessToken = token.accessToken;
            }

            // @ts-ignore
            const email = session?.user?.email;
        
            try {
                // Precisamos pegar as informações adicionais do usuario caso tenha sido autenticado pelo google ou outro tipo de autenticação

                const userInfo = {
                    user: {
                        id: "67cc0ae9-7015-4903-8c0d-a1c1cac6e449",
                        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoiNjdjYzBhZTktNzAxNS00OTAzLThjMGQtYTFjMWNhYzZlNDQ5IiwiaWF0IjoxNjg4MzE2NTcwfQ.clQQVbPbt9fnwrweOs-X7tO6UoWEKgq-GGSj--JdZzA"
                    }
                };
                
                if(email){
                    //const userInfo = await getUser(email);

                    const newSession = {
                        ...session,
                        user: {
                            ...session.user,
                            ...userInfo?.user,
                        },
                    }

                    return newSession;
                }
        
                return session;
            } catch (error: any) {
                console.error("Error retrieving user data: ", error.message);
                return session;
            }
        },
        async signIn({ user, account }: {
          user: AdapterUser | User | any,
          account: Account | null
        }) {
            try {
                if(account?.provider === "google") {
                    /*const userExists = await getUser(user?.email as string) as { user?: UserProfile }
                    
                    if (!userExists.user) {
                        await createUser(user.name as string, user.email as string, user.image as string)
                    }*/
                }

                return true;
            } catch (error: any) {
                console.log("Error checking if user exists: ", error.message);
                return false;
            }
        },
    },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };