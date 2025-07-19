import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import ProductCard from "./components/product-card";
import { Category, Product } from "@/lib/types";

export default async function Home() {
 
  const [categoriesResponse, productsResponse] = await Promise.all([fetch(`${process.env.NEXT_BACKEND_API_BASE_URL}/api/catalog/category`, {
    next: {
      revalidate: 3600
    }
  }), fetch(`${process.env.NEXT_BACKEND_API_BASE_URL}/api/catalog/products?limit=100&tenantId=11`)]);

  if (!productsResponse.ok || !categoriesResponse.ok) {
    throw Error("Failed to load Products or Categories")
  }

  const categories: Category[] = await categoriesResponse.json()
  const products: { data: Product[] } = await productsResponse.json()

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

      <section>
        <div className="container py-12">
          <Tabs defaultValue={categories[0]._id}>
            <TabsList className="mb-4">
              {
                categories.map((category: Category) => {
                  return (
                    <TabsTrigger key={category._id} value={category._id!} className="text-lg p-4 data-[state=active]:bg-white">{category.name}</TabsTrigger>
                  )
                })
              }
            </TabsList>

            {
              categories.map((category: Category) => {
                return (
                  <TabsContent key={category._id} value={category._id!}>
                    <div className="grid grid-cols-4 gap-4">
                      {
                        products.data.filter((product) => product.category._id === category._id).map((product) => {
                          return (
                            <ProductCard product={product} key={product._id} />
                          )
                        })
                      }
                    </div>
                  </TabsContent>
                )
              })
            }

            {/* <TabsContent value="Pizza">
              <div className="grid grid-cols-4 gap-4">
                {/* {
                  products.map((prod) => <ProductCard product={prod} key={prod._id} />)
                } */}
            {/* </div>
            </TabsContent> */}

          </Tabs>
        </div>
      </section>
    </>
  )

}
