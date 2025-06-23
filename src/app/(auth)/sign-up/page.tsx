import SignUpView from "@/components/auth/views/SignUpView"
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers as getHeaders } from "next/headers";

const SignUpPage = async () => {
    const session = await auth.api.getSession({
      headers: await getHeaders()
    })
    if (!!session) {
      redirect("/sign-in");
    }
  return (
    <SignUpView/>
  )
}
export default SignUpPage