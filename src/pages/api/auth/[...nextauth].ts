import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { httpApi } from '../http.api';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "you@example.com" },
                password: { label: "Password", type: "password" },
                role: { label: "Role", type: "text" }, // Role field to differentiate between login pages
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }

                try {
                    const response = await httpApi.post(`/auth/login`, {
                        email: credentials.email,
                        password: credentials.password,
                        role: credentials.role, // Include role in login request
                    });

                    const user = response.data;

                    if (user) {
                        return user; // Return the user if login is successful
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error('Authentication error:', error);
                    return null;
                }
            }
        }),
    ],
    pages: {
        // The signIn page is dynamically determined in the callback below
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            // Redirect to different login pages based on role
            if (url === '/client/login') {
                return `${baseUrl}/client/login`;
            } else if (url === '/company/login') {
                return `${baseUrl}/company/login`;
            } else {
                return `${baseUrl}/professional/login`;
            }
        },
        async session({ session, token }) {
            if (token.user) {
                session.user = token.user as {
                    name?: string | null;
                    email?: string | null;
                    image?: string | null;
                };
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        }
    }
});
