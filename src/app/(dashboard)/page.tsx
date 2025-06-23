import HomeView from "@/components/home/views/HomeView";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {headers as getHeaders} from 'next/headers'
const HomePage = async () => {
  const session = await auth.api.getSession({
    headers: await getHeaders(),
  });
  if (!session) {
    redirect("/sign-in");
  }
  return <HomeView />;
};
export default HomePage;
