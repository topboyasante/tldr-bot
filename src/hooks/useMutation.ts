import { useBotStore } from "@/zustand";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";

function useMutationRequest() {
  const addToTLDR = useBotStore((state) => state.addData);
  const { toast } = useToast();

  const {
    mutate: sendMessage,
    data: messageResponse,
    isPending: isSendingMessage,
  } = useMutation({
    mutationFn: async (payload: payloadSchema) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/${payload.urlModifier}`,

        payload.data,
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
            "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
          },
        }
      );
      return res.data.summary[0];
    },
    onSuccess: (res) => {
      console.log(res);
      addToTLDR({ role: "bot", content: res });
    },
    onError: (error: AxiosError<any, any>) => {
      toast({
        title: "Error",
        description: `${error?.response?.data.detail[0].msg}`,
        variant: "destructive",
      });
    },
  });

  return {
    sendMessage,
    messageResponse,
    isSendingMessage,
  };
}

export default useMutationRequest;
