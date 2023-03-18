import type { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { prettify } from "@/lib/utils";
import { FormEvent, useContext, useState } from "react";
import { useRouter } from "next/router";
import UserContext from "@context/UserContext";
import { getUser, loginUser } from "@/lib/apiClient";
import SidebarContent from "@/components/SidebarContent";

interface Params extends ParsedUrlQuery {
  role: "student" | "instructor" | "admin" | "depthead" | "college_coordinator";
}

export const getStaticProps: GetStaticProps<Params, Params> = (ctx) => {
  const { role } = ctx.params!;

  return {
    props: {
      role,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      { params: { role: "student" } },
      { params: { role: "instructor" } },
      { params: { role: "admin" } },
      { params: { role: "depthead" } },
      { params: { role: "college_coordinator" } },
    ],
    fallback: false,
  };
};

export default function Login({ role }: Params) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { setUser } = useContext(UserContext);

  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const hasError = await loginUser(
      { email, password, role },
      router,
      setErrorMsg
    );
    if (!hasError) {
      const user = await getUser();
      setUser(user);
      setErrorMsg("");
    }
  }

  return (
    <SidebarContent>
      <form
        method="post"
        className="form-control gap-4"
        onSubmit={handleSubmit}
      >
        {errorMsg && (
          <h1 className="text-center text-3xl text-red-500 my-4">{errorMsg}</h1>
        )}
        <h1 className="text-center text-3xl">{prettify(role)} Login</h1>
        <label htmlFor="email" className="input-group">
          <span className="hidden w-1/2 sm:inline-flex">Email</span>
          <input
            id="email"
            name="email"
            className="input-bordered input"
            type="text"
            placeholder="johndoe@mail.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password" className="input-group justify-center">
          <span className="hidden w-1/2 sm:inline-flex">Password</span>
          <input
            id="password"
            name="password"
            className="input-bordered input"
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" className="btn-primary btn">
          Login
        </button>
      </form>
    </SidebarContent>
  );
}
