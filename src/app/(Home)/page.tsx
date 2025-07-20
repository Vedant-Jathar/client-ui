import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Suspense } from "react";
import ProductList from "./components/product-list";
export default async function Home() {

  // const products: Product[] = [
  //   {
  //     _id: "1",
  //     name: "Margerita pizza",
  //     description: "This is a delicious pizza originally from California nvjibnrfj wfbewjibf ewfbewjb jwbwej jiwdcbwj hjbfewijf ibwdj ijjbfjwe jibfef buebf",
  //     image: "/pizza-main.png",
  //     price: 800
  //   },
  //   {
  //     _id: "2",
  //     name: "Pepporoni pizza",
  //     description: "This is a delicious pizza",
  //     image: "/pizza-main.png",
  //     price: 800
  //   },
  //   {
  //     _id: "3",
  //     name: "Spinach pizza",
  //     description: "This is a delicious pizza",
  //     image: "/pizza-main.png",
  //     price: 800
  //   },
  //   {
  //     _id: "4",
  //     name: "Corn pizza",
  //     description: "This is a delicious pizza",
  //     image: "/pizza-main.png",
  //     price: 800
  //   },
  //   {
  //     _id: "5",
  //     name: "Chicken pizza",
  //     description: "This is a delicious pizza",
  //     image: "/pizza-main.png",
  //     price: 800
  //   },
  //   {
  //     _id: "6",
  //     name: "Special pizza",
  //     description: "This is a delicious pizza",
  //     image: "/pizza-main.png",
  //     price: 800
  //   },
  // ]

  return (
    <>
      <section className="bg-white">
        <div className="container flex items-center justify-between py-24">
          <div>
            <h1 className="text-5xl font-black font-sans ">
              Super Delicious Pizzas in <br />
              <p className="text-primary mt-2">Only 45 mins</p>
            </h1>
            <p className="text-2xl mt-8 max-w-lg leading-snug">Enjoy a free meal if you dont receive your order within 45 minutes</p>
            <Button className="mt-8 text-lg rounded-full py-7 px-6 font-bold">Get your pizza now</Button>
          </div>

          <div>
            <Image src={"/pizza-main.png"} alt="pizza-image" width={400} height={400} />
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="container">Loading</div>}>
        <ProductList />
      </Suspense>
    </>
  )

}
