import { Layout } from 'components/Layout'
import { Orders } from 'pages/Orders'
import { Overview } from 'pages/Overview'
import { Profile } from 'pages/Profile'
import { AddCategory } from 'pages/categories/AddCategory'
import { Categories } from 'pages/categories/Categories'
import { CustomerDetails } from 'pages/customers/CustomerDetails'
import { Customers } from 'pages/customers/Customers'
import { AddProduct } from 'pages/products/AddProduct'
import { Products } from 'pages/products/Products'
import { Settings } from 'pages/settings/Settings'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home'

const routes = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		// path: 'overview',
		element: <Layout />,
		children: [
			{
				path: 'overview',
				element: <Overview />,
			},
			{
				path: 'orders',
				element: <Orders />,
			},
			{
				path: 'profile',
				element: <Profile />,
			},
			{
				path: 'categories',
				children: [
					{
						index: true,
						element: <Categories />,
					},
					{
						path: 'add',
						element: <AddCategory />,
					},
				],
			},
			{
				path: 'products',
				children: [
					{
						index: true,
						element: <Products />,
					},
					{
						path: 'add',
						element: <AddProduct />,
					},
				],
			},
			{
				path: 'customers',
				children: [
					{
						index: true,
						element: <Customers />,
					},
					{
						path: ':id',
						element: <CustomerDetails />,
					},
				],
			},
			{
				path: 'settings',
				children: [
					{
						index: true,
						element: <Settings />,
					},
				],
			},
		],
	},
])

const App = () => {
	return <RouterProvider router={routes} />
}

export default App
