export type Product = {
    uid: number;
    image: string;
    producttitle: string;
    description: string;
    category: string;
    price: number;
    rating: number;
}

export type CartItem = Pick<Product, "uid" | "image" | "producttitle" | "price">;