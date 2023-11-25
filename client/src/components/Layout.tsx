import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'

export const Layout = () => {
	return (
		<>
			<header className='bg-neutral-900 p-4 text-white'>
				<div className='mx-auto max-w-6xl'>
					<Navbar />
				</div>
			</header>

			<main>
				<Outlet />
			</main>

			<footer className='mx-auto flex w-full max-w-6xl items-center justify-between gap-2 border-t-2 border-t-neutral-200 py-2 text-xs text-neutral-500'>
				<p>&copy; {new Date().getFullYear()} Headless Commerce</p>

				<ul className='flex items-center gap-4 font-medium uppercase tracking-wider'>
					<li>Status</li>
					<li>Documentation</li>
				</ul>
			</footer>
		</>
	)
}
