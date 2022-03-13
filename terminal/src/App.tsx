import { BrowserRouter, Routes, Route } from 'react-router-dom';

import IngredientAdmin from './Pages/admin/IngredientAdmin';
import ProductAdmin from './Pages/admin/ProductAdmin';

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/admin">
                    <Route path="/admin/ingredient" element={<IngredientAdmin />} />
                    <Route path="/admin/product" element={<ProductAdmin />} />
                </Route>

                <Route path="/kitchen">
                    <Route path="/kitchen/commands" element={<ProductAdmin />} />
                </Route>

                <Route path="/client">
                    <Route path="/client/product"/>
                    <Route path="/client/product/custom"/>
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;
