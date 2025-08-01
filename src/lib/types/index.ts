import { CartItem } from "../store/features/Cart/cartSlice"

export interface Tenant {
    id: string
    name: string
    address: string
}

export interface PriceConfiguration {
    [key: string]: {
        priceType: "base" | "additional",
        availableOptions: string[]
    }
}

export interface Attribute {
    name: string
    widgetType: "switch" | "radio"
    defaultValue: string
    availableOptions: string[]
}

export interface Category {
    _id?: string
    name: string
    priceConfiguration: PriceConfiguration,
    attributes: Attribute[]
    hasToppings: boolean
}



export type ProductAttribute = {
    name: string;
    value: string | boolean;
};

export interface ProductPriceConfiguration {
    [key: string]: {
        priceType: 'base' | 'aditional';
        availableOptions: {
            [key: string]: number;
        };
    };
}

export type Product = {
    _id: string;
    name: string;
    image: string;
    description: string;
    category: Category;
    priceConfiguration: ProductPriceConfiguration;
    attributes: ProductAttribute[];
    isPublish: boolean;
    createdAt: string;
    updatedAt: string
};


export type Topping = {
    _id: string
    name: string
    price: number
    image: string
    isPublished: boolean
}

export interface address {
    text: string,
    isDefault: boolean
}

export interface Customer {
    _id: string
    userId: string
    firstName: string
    lastName: string
    email: string
    addresses: address[]
}

export interface addAddressData {
    address: string,
    customerId: string
}

export interface verifyCouponData {
    code: string | undefined,
    tenantId: string
}

export interface verifyCouponResponse {
    valid: boolean,
    discount: number
}

export interface createOrderData {
    tenantId: string,
    customerId: string,
    address: string,
    paymentMode: string,
    cart: CartItem[],
    couponCode: string,
    comment?: string
}

export interface createOrderResponse {
    paymentUrl: string,
    orderId?: string,
    tenantId?: string
}