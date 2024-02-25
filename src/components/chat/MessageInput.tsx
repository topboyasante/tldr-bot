"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useMutationRequest from "@/hooks/useMutation";
import { useBotStore } from "@/zustand";
import { useForm } from "react-hook-form";
import Loader from "../ui/loader";

function MessageInput() {
  const addToTLDR = useBotStore((state) => state.addData);

  const { sendMessage, isSendingMessage } = useMutationRequest();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();

  function onSubmit(data: any) {
    const newMessage = { role: "user", content: data.message };
    addToTLDR(newMessage);
    sendMessage({
      urlModifier: "abstractive/summarize-url/",
      data: {
        "url": newMessage.content,
        "min_length": 100,
        "max_length": 300,
        "is_detailed": false,
      },
    });
    reset();
  }

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="p-5 w-full">
        <div className="w-full flex items-center gap-5">
          <Input
            {...register("message", { required: "This field is required!" })}
            placeholder={
              errors.message ? `${errors.message.message}` : "Article URL"
            }
            disabled={isSendingMessage}
          />
          <Button type="submit" disabled={isSendingMessage}>
            {isSendingMessage ? <Loader /> : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default MessageInput;
