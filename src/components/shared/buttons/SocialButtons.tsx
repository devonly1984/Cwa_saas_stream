"use client";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { BetterFetchError } from "better-auth/react";
import { authClient } from "@/lib/authClient";
import { useRouter } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa";
interface Props {
  setError: Dispatch<SetStateAction<string>>;
  setIsPending: Dispatch<SetStateAction<boolean>>;
}
const SocialButtons = ({ setError, setIsPending }: Props) => {
  const router = useRouter();
  const onSocial = (provider: "github" | "google") => {
    authClient.signIn.social(
      {
        provider,
        
      },
      {
        onSuccess: () => {
          setIsPending(false);
          router.push('/')
        },
        onError: ({
          error,
        }: {
          error: BetterFetchError & Record<string, string>;
        }) => {
          setError(error.message);
        },
      }
    );
  };
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant={"outline"}
        type="button"
        className="w-full"
        onClick={() => onSocial("google")}
      >
        <FaGoogle />
      </Button>
      <Button
        variant={"outline"}
        type="button"
        className="w-full"
        onClick={() => onSocial("github")}
      >
        <FaGithub />
      </Button>
    </div>
  );
};
export default SocialButtons;
