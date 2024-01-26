"use client";

import React, { useState } from "react";
import Button from "../Button";
import MyDialog from "../global/Dialog";
import Image from "next/image";
import NotificationImage from "/public/images/notif.jpg";

import { messaging } from "@/lib/firebase";
import { getToken, onMessage } from "firebase/messaging";

const DialogGetNotificationsPermission = () => {
  const [open, setOpen] = useState(true);

  const requestNotificationPermission = async () => {
    setOpen(false);
    console.log("Requesting permission...");
    const permission = await Notification.requestPermission(); // denied <> granted

    try {
      if (permission === "granted") {
        console.log("✅ Notification permission granted.");
        console.log({ messaging });

        const token = await getToken(messaging, {
          // Voluntary Application Server Identification / VAPID -> public key
          vapidKey:
            "BEJjsN1_y1rYv2thXnIVujO4ToJVR-OFh8NNL0h9iE2E8FslGv5weH-MoBKP5NeCdOM_oTnAt8E8AAyH7mhXBDg",
        });

        console.log({ token });

        onMessage(messaging, (payload) => {
          console.log("Message received. ", payload);
          // ...
        });
      } else {
        console.log("❌ Unable to get permission to notify.");
      }
    } catch (error) {
      console.log("❌ Error generating notifications");
      console.log(error);
    }
  };

  return (
    <div className="!z-[1000]">
      <MyDialog open={open} setOpen={setOpen} title="Receive updates?">
        <div className="p-8 space-y-4">
          <div className="rounded-3xl overflow-hidden">
            <Image src={NotificationImage} alt="Notification bell" />
          </div>
          <p className="text-BodyMedium">
            Would you like to receive push notifications?
          </p>
          <div className="flex space-x-4">
            <Button
              full
              className="!bg-lightGray"
              onClick={() => setOpen(false)}
            >
              Nope
            </Button>
            <Button
              full
              className="!bg-green"
              onClick={requestNotificationPermission}
            >
              Yes, I&apos;m in!
            </Button>
          </div>
        </div>
      </MyDialog>
    </div>
  );
};

export default DialogGetNotificationsPermission;
