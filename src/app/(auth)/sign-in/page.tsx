import SignInView from "@/components/auth/views/SignInView";
import { auth } from "@/lib/auth";
import {headers as getHeaders} from 'next/headers'
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await auth.api.getSession({
    headers: await getHeaders()
  })
  if (!!session) {
    redirect("/");
  }
  return <SignInView />;
};
export default SignInPage;
