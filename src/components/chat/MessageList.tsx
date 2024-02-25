"use client";
import { useBotStore } from "@/zustand";
import React from "react";
import Avatar from "boring-avatars";

function MessageList() {
  const messagesList = useBotStore((state) => state.tldrStorage);

  return (
    <div className="max-w-screen-md mx-auto h-full ">
      {messagesList && messagesList.length > 0 ? (
        <div className="relative w-full h-full">
          {messagesList.map((item, index) => {
            if (item.role === "user") {
              return (
                <div key={index} className="flex justify-end">
                  <div>
                    <div className="flex justify-end items-center gap-2">
                      <p className="text-right font-bold">You</p>
                      <Avatar
                        size={30}
                        name="Client"
                        variant="beam"
                        colors={[
                          "#92A1C6",
                          "#146A7C",
                          "#F0AB3D",
                          "#C271B4",
                          "#C20D90",
                        ]}
                      />
                    </div>
                    <p className="border p-3 rounded-md my-5">{item.content}</p>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={index} className="flex justify-start">
                  <div>
                    <div className="flex justify-start items-center gap-2">
                      <p className="text-right font-bold">TLDR</p>
                      <Avatar
                        size={30}
                        name="Robot"
                        variant="beam"
                        colors={[
                          "#92A1C6",
                          "#146A7C",
                          "#F0AB3D",
                          "#C271B4",
                          "#C20D90",
                        ]}
                      />
                    </div>
                    <p className="border p-3 rounded-md my-5">{item.content}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <p>No messages sent, yet</p>
        </div>
      )}
    </div>
  );
}

export default MessageList;
