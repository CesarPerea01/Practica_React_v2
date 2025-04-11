
export async function searchProducts(){
    
    try {
        const response = await fetch ('https://dummyjson.com/products')
        const json = await response.json()

        const productos = json.products

        return productos?.map(producto=>({
            id: producto.id,
            title: producto.title,
            thumbnail: producto.thumbnail,
            category: producto.category,
            price: producto.price
        }))
    } catch (error) {
        throw new Error(error)
    }
}