import Image from "next/image";
import { useRouter } from "next/router";
import type { VFC } from "react";
import { useGetWindowSize } from "src/hook/useGetWindowSize";
import type { ReadTicket } from "src/type/ticket";
import useSWR from "swr";

import { Address } from "./Address";
import { Checkout } from "./Checkout";
import { Organizer } from "./Organizer";
import { Overview } from "./Overview";

export const DetailPageLayout: VFC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { windowSize } = useGetWindowSize();

  const { data: ticket } = useSWR<ReadTicket>(id as string);

  return (
    <div className="pb-4 tracking-wide leading-relaxed">
      {ticket && (
        <div className="px-4 pt-6 text-center">
          <Image
            width={800}
            height={600}
            src={ticket.images[0] ?? "/noimage.jpg"}
            alt={ticket.images[0] ? ticket.name : "not image data"}
            className="object-cover object-center w-full h-full rounded-lg"
            layout={windowSize.width < 450 ? "responsive" : "intrinsic"}
          />

          {/* Product info */}
          <div className="pb-16 mx-auto space-y-10 max-w-2xl sm:px-6 ">
            <Overview
              name={ticket.name}
              description={ticket.description}
              startDay={ticket.metadata.startDay}
            />

            <Checkout />

            {ticket.metadata.address && <Address data={ticket.metadata} />}
            <Organizer />
          </div>
        </div>
      )}
    </div>
  );
};
