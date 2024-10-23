import axios, { AxiosResponse } from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { API_BASE_URL } from "src/pages/api/http.api"; 

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your.email@example.com" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" }, // Role field to differentiate between login pages
      },
      async authorize(credentials) {
        try {
          if (!credentials) {
            throw new Error("Credentials are required");
          }

          // Determine the API endpoint based on the role
          let loginEndpoint = '';
          switch (credentials.role) {
            case 'client':
              loginEndpoint = `${API_BASE_URL}/login/client`;
              break;
            case 'company':
              loginEndpoint = `${API_BASE_URL}/login/company`;
              break;
            case 'professional':
              loginEndpoint = `${API_BASE_URL}/login/professional`;
              break;
            default:
              throw new Error("Invalid role");
          }

          // Make the POST request to the appropriate backend login endpoint
          const res: AxiosResponse<{ user: { token: string; id: string } }> = await axios.post(
            loginEndpoint,
            {
              email: credentials.email,
              password: credentials.password,
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          // Check for successful login response
          if (res.status === 200 && res.data.user?.token) {
            // Return user object with the token
            return {
              id: res.data.user.id, // Assuming an ID property in the response
              email: credentials.email,
              token: res.data.user.token, // Extract the token from the response
            };
          } else {
            console.error("Login failed:", res.data);
            throw new Error("Invalid email or password"); // Or a custom error message
          }
        } catch (error) {
          console.error("Error during login:", error);
          throw new Error("An error occurred. Please try again later.");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 30 * 60, // 30 minutes session max age
  },
  jwt: {
    // Add any JWT configuration here if needed
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
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
    async redirect({ url, baseUrl }) {
      // Redirect users based on role after sign-in
      if (url === '/client/login') {
        return '/client/'; // Redirect to client dashboard
      } else if (url === '/company/login') {
        return '/company/'; // Redirect to company dashboard
      } else if (url === '/professional/login') {
        return '/professional/'; // Redirect to professional dashboard
      }
      return baseUrl; // Default redirection
    },
  },
  pages: {
    // Specify different login pages based on roles
    signIn: '/professional/login', // Default login page; this can be dynamically changed by user input
  },
});
