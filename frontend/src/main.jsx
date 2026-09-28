import { createRoot } from 'react-dom/client'
import './index.css'
import MainRoutes from './routes/MainRoutes.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.jsx'
import toast, { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
     <Provider store={store}>
        <MainRoutes/>
       <Toaster
        position="top-right"
        reverseOrder={false}
       />
     </Provider>,
)