"use client"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AgentGetOne } from "@/index";
import { AgentInsertSchema, agentsInsertSchema } from "@/lib/schemas/AgentSchema";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import GeneratedAvatar from '@/components/shared/GeneratedAvatar'
import { toast } from "sonner";

interface AgentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
}
const AgentForm = ({
  onCancel,
  onSuccess,
  initialValues,
}: AgentFormProps) => {
    const trpc = useTRPC();
    const router = useRouter()
    const queryClient = useQueryClient();
    const createAgent = useMutation(
      trpc.agents.create.mutationOptions({
        onSuccess: () => {
          queryClient.invalidateQueries(
            trpc.agents.getMany.queryOptions({})
          );
         
          onSuccess?.();
        },
        onError: (error) => {
          toast.error(error.message);
          if (error?.data?.code === "UNAUTHORIZED") {
            router.push("/upgrade");
          }
        },
      })
    );
     const updateAgent = useMutation(
        trpc.agents.update.mutationOptions({
          onSuccess: async ()=>{
            await queryClient.invalidateQueries(
              trpc.agents.getMany.queryOptions({})
            );
            if (initialValues?.id) {
              await queryClient.invalidateQueries(
                trpc.agents.getOne.queryOptions({ id: initialValues.id })
              );
            }
            onSuccess?.();
          },
          onError:(error)=>{
            toast.error(error.message);
          }
        })
      )
    const agentform = useForm<agentsInsertSchema>({
      resolver: zodResolver(AgentInsertSchema),
      defaultValues: {
        name: initialValues?.name || "",
        instructions: initialValues?.instructions || "",
      },
    });
    const isEdit = !!initialValues?.id;
    const isPending = createAgent.isPending || updateAgent.isPending;
    const onSubmit = (values: agentsInsertSchema)=>{
        if (isEdit) {
            updateAgent.mutate({ ...values, id: initialValues.id });
        }  else {
            createAgent.mutate(values);
        }
    }
 
  return (
    <Form {...agentform}>
      <form
        className="space-y-4"
        onSubmit={agentform.handleSubmit(onSubmit)}
      >
        <GeneratedAvatar
          seed={agentform.watch("name")}
          variant="botttsNeutral"
          className="border size-16"
        />
        <FormField
          control={agentform.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. John or Math Tutor" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={agentform.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="You are a helpful math assistant that can answer questions and help with tasks."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between gap-x-2">
          {onCancel && (
            <Button
              variant="ghost"
              disabled={isPending}
              type="button"
              onClick={() => onCancel()}
            >
              Cancel
            </Button>
          )}
          <Button disabled={isPending} type="submit">
            {isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default AgentForm