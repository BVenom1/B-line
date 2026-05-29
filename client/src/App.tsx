import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SignupLogin } from './components/signup_login/signup_login';

function App() {
    const route = createBrowserRouter([
        { path: "/", element: <SignupLogin /> }
    ])


    return (
        <div id="app">
            <RouterProvider router={route} />
        </div>
    )
}

export default App
