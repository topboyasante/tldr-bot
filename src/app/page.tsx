import MessageInput from "@/components/chat/MessageInput";
import MessageList from "@/components/chat/MessageList";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

function Home() {
  return (
    <div className="w-full pt-[8vh] h-screen">
      <div className="max-w-xl mx-auto h-full">
        <div className="h-[90%]">
          <ScrollArea className="w-full h-full p-5">
            <MessageList />
          </ScrollArea>
        </div>
        <div className="w-full h-[5%]">
          <MessageInput />
        </div>
      </div>
    </div>
  );
}

export default Home;
