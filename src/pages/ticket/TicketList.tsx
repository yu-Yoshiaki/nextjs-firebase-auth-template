import Image from "next/image";
import Link from "next/link";
import type { Ticket } from "src/type/ticket";

import { CardLayout } from "./CardLayout";

const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc: "/bread.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    imageSrc: "/mobile.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 3,
    name: "Basic Tee",
    href: "#",
    imageSrc: "/mobile.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 4,
    name: "Basic Tee",
    href: "#",
    imageSrc: "/mobile.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 5,
    name: "Basic Tee",
    href: "#",
    imageSrc: "/mobile.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 6,
    name: "Basic Tee",
    href: "#",
    imageSrc: "/mobile.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 7,
    name: "Basic Tee",
    href: "#",
    imageSrc: "/mobile.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 8,
    name: "Basic Tee",
    href: "#",
    imageSrc: "/mobile.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 9,
    name: "Basic Tee",
    href: "#",
    imageSrc: "/mobile.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 10,
    name: "Basic Tee",
    href: "#",
    imageSrc: "/mobile.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 11,
    name: "Basic Tee",
    href: "#",
    imageSrc: "/mobile.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
];

export const TicketList = (props: { datas: Ticket[]; test: boolean }) => {
  if (props.test)
    return (
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 mt-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {products.map((data) => {
          return (
            <div key={data.id} className="group relative min-h-[380px] shadow-lg">
              <div className="w-full rounded-md group-hover:opacity-75 ">
                <Link href={`/ticket/${data.id}`}>
                  <a>
                    <Image
                      src={"/mobile.jpg"}
                      alt={""}
                      width={420}
                      height={300}
                      className="block object-cover object-center w-full h-full"
                    />
                  </a>
                </Link>
              </div>
              <div className="flex flex-col p-[10px] space-y-1">
                <h2 className="text-lg font-medium">{data.name}</h2>
                <p className="px-1">{"data.description"}</p>
                <p className="px-1 text-xl text-right">pay {data.price}~</p>
              </div>
            </div>
          );
        })}
      </div>
    );

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 mt-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {props.datas.map((data) => {
          return <CardLayout ticket={data} key={data.id} />;
        })}
      </div>
    </div>
  );
};
