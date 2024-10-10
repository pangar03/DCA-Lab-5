export const getProducts = async () => {
    try {
        const data = await fetch(`https://fakestoreapi.com/products`).then((res) => res.json());
        return data;
    }

    catch (error) {
        console.error(error);
    }
};