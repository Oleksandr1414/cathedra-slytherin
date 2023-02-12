import NextAuth from "next-auth";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      authorize: async (credentials) => {
        const response = await axios({
          method: "post",
          data: {
            username: credentials.login?.trim(),
            password: credentials.password?.trim(),
          },
          withCredentials: true,
          url: "http://localhost:3001/login",
        });

        if (!response.data.error) {
          return response.data.user;
        }

        throw { message: response.data.error.message };
      },
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user.id = token.id;
      session.user.login = token.login;
      session.user.role = token.role;
      session.user.course = token.course;
      session.user.name = token.name;
      session.user.surname = token.surname;
      session.user.email = token.email;
      session.user.date = token.date;

      return session;
    },
  },
});
