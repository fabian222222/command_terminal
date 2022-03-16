import { BrowserRouter, Routes, Route } from 'react-router-dom';

import IngredientAdmin from './Pages/Admin/IngredientAdmin';
import ProductAdmin from './Pages/Admin/ProductAdmin';

import Connection from './Pages/User/Connection';

import ListCommandKitchen from './Pages/Kitchen/ListCommandKitchen';

import ProductsClient from './Pages/User/ProductsClient'

import Cart from './Pages/Cart/Cart'

import IngredientProvider from './Providers/Ingredients/IngredientProvider';
import CartProvider from './Providers/Cart/CartProvider';
import ClientNestedRoutes from './Components/Client/ClientNestedRoutes';
import CommandsAdmin from './Pages/Admin/CommandsAdmin';

function App() {
    return (
        <IngredientProvider>
            <CartProvider>

                <BrowserRouter>
                    <Routes>

                        <Route path="/auth" element={<Connection/>}>
                        </Route>

                        <Route path="/admin">
                            <Route path="/admin/ingredient" element={<IngredientAdmin />} />
                            <Route path="/admin/product" element={<ProductAdmin />} />
                            <Route path="/admin/command" element={<CommandsAdmin />} />
                        </Route>

                        <Route path="/kitchen">
                            <Route path="/kitchen/command" element={<ListCommandKitchen />} />
                        </Route>

                        <Route path="/client/*" element={
                            <Cart>
                                <ClientNestedRoutes></ClientNestedRoutes>
                            </Cart>}>
                        </Route>

                    </Routes>
                </BrowserRouter>
            
            </CartProvider>
        </IngredientProvider>
    );
}

export default App;
