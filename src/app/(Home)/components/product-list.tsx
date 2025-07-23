import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Category, Product } from '@/lib/types';
import React from 'react'
import ProductCard from './product-card';

export const ProductList = async ({ searchParams }: { searchParams: { restaurant: string } }) => {
    
    const [categoriesResponse, productsResponse] = await Promise.all([fetch(`${process.env.NEXT_BACKEND_API_BASE_URL}/api/catalog/category`), fetch(`${process.env.NEXT_BACKEND_API_BASE_URL}/api/catalog/products?limit=100&tenantId=${searchParams.restaurant}`)]);

    if (!productsResponse.ok || !categoriesResponse.ok) {
        throw Error("Failed to load Products or Categories")
    }

    const categories: Category[] = await categoriesResponse.json()
    const products: { data: Product[] } = await productsResponse.json()

    return (
        <>

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



                    </Tabs>
                </div>
            </section>
        </>
    )
}

export default ProductList