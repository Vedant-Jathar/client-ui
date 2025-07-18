import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function Home() {
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

      <section>
        <div className="container py-12">
          <Tabs defaultValue="Pizza" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="Pizza" className="text-lg p-4 data-[state=active]:bg-white">Pizza</TabsTrigger>
              <TabsTrigger value="Beverages" className="text-md p-4 data-[state=active]:bg-white">Beverages</TabsTrigger>
            </TabsList>
            <TabsContent value="Pizza">Pizza</TabsContent>
            <TabsContent value="Beverages">Beverages</TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
