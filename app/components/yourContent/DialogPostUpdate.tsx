import React, { useState } from "react";
import Button from "@/components/Button";
import MyDialog from "@/components/global/Dialog";
import Input from "@/components/Input";
import { mutate } from "swr";
import { Metric } from "@/types";
import getUser from "@/utils/getUser";
import { usePathname } from "next/navigation";
import { postUpdate } from "@/queries/metric";
import { ToastContentProps, toast } from "react-toastify";
import convertNumber from "@/utils/convertNumber";
import formatNumber from "@/utils/formatNumber";
import MetricChart from "../dashboard/Chart";

const DialogPostUpdate = ({ metric }: { metric: Metric }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const [value, setValue] = useState("");

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const create = async () => {
      const user = await getUser(pathname);
      console.log(user);
      const { data, error } = await postUpdate({
        value: convertNumber(value),
        metric: metric.id,
      });
      if (error) throw error;
      mutate("getAllMetrics");
    };

    toast.promise(create, {
      pending: "Posting Update...",
      success: "Done!",
      error: {
        render({ data }: ToastContentProps<any>) {
          return data.message;
        },
      },
    });
  };

  const xs = [...metric.metric_value].reverse().map((value) => {
    const [_, MONTH, DATE, YEAR] = new Date(value.created_at)
      .toDateString()
      .split(" ");
    return `${MONTH} ${DATE}`;
  });
  const ys = [...metric.metric_value].reverse().map((value) => value.value);

  return (
    <div>
      <Button full border className="!bg-brown" onClick={() => setOpen(true)}>
        Post Update
      </Button>
      <MyDialog open={open} setOpen={setOpen} title="Post Update">
        <form onSubmit={(e) => onFormSubmit(e)}>
          <div className="py-4 pb-8 px-6 md:min-w-[28rem] space-y-4">
            <p className="text-BodyMedium">{metric.name}</p>
            <p className="text-BodyMedium2 opacity-60">{metric.description}</p>
            <div className="flex flex-col space-y-2">
              <Input
                type="text"
                value={value}
                onChange={(e) => setValue(formatNumber(e.target.value))}
                className="!px-2"
              />
            </div>
            <Button full border className="!bg-green">
              Post Update
            </Button>
            <MetricChart xs={xs} ys={ys} />
          </div>
        </form>
      </MyDialog>
    </div>
  );
};

export default DialogPostUpdate;
