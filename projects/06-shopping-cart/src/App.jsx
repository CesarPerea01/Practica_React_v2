import {Products} from './components/Products.jsx'
import { Header } from './components/Header.jsx'
import { Footter } from './components/Footer.jsx'
import { FiltersContext } from './context/filters.jsx'
import { useFilter } from './hooks/useFilters.js'
import { Cart } from './components/Cart.jsx'
import { CartProvider } from './context/cart.jsx'
import { useProducts } from './hooks/useProduct.js'
import { useEffect } from 'react'



function App() {
  const {products, getProducts} = useProducts()
  const {filterProducts} = useFilter()

  useEffect(()=>{
      getProducts()
    return
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const filteredProducts = filterProducts(products)

  return (
    <CartProvider>
      <Header/>
      <Cart/>
      <Products products={filteredProducts}/>
      <Footter/>
    </CartProvider>
  )
}

export default App
