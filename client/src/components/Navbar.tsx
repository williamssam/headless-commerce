import {
	Basket,
	BellSimple,
	FolderNotch,
	GearFine,
	HouseSimple,
	Receipt,
	UsersThree,
} from '@phosphor-icons/react'
import { NavLink } from 'react-router-dom'

const main_menu = [
	{
		id: 1,
		name: 'Overview',
		route: '/overview',
		icon: <HouseSimple size={18} weight='fill' />,
	},
	{
		id: 2,
		name: 'Orders',
		route: '/orders',
		icon: <Receipt size={18} weight='fill' />,
	},
	{
		id: 3,
		name: 'Products',
		route: '/products',
		icon: <Basket size={18} weight='fill' />,
	},
	{
		id: 4,
		name: 'Categories',
		route: '/categories',
		icon: <FolderNotch size={18} weight='fill' />,
	},
	{
		id: 5,
		name: 'Customers',
		route: '/customers',
		icon: <UsersThree size={18} weight='fill' />,
	},
]

const settings_menu = [
	{
		id: 1,
		name: 'Settings',
		route: '/settings',
		icon: <GearFine size={18} weight='fill' />,
	},
	{
		id: 2,
		name: 'Notification',
		route: '/notification',
		icon: <BellSimple size={18} weight='fill' />,
	},
]

export const Navbar = () => {
	return (
		<nav className='flex items-center justify-between gap-2 rounded-md bg-neutral-800 px-6 py-2'>
			<div className='flex items-center gap-10'>
				<h1 className='text-xs/tight font-bold text-neutral-400'>
					Headless <br /> <span className='uppercase'>Commerce</span>
				</h1>

				<ul className='flex items-center gap-1 text-sm'>
					{main_menu.map(menu => (
						<li key={menu.id}>
							<NavLink
								to={menu.route}
								className={({ isActive }) =>
									`${
										isActive
											? 'bg-neutral-700 font-semibold text-white'
											: 'text-neutral-400'
									} flex items-center gap-2 rounded px-4 py-2 transition-colors hover:text-neutral-100`
								}
							>
								{menu.icon}
								<span>{menu.name}</span>
							</NavLink>
						</li>
					))}
				</ul>
			</div>

			<ul className='flex items-center gap-3 text-sm'>
				{settings_menu.map(menu => (
					<li key={menu.id}>
						<NavLink
							aria-label={menu.name}
							to={menu.route}
							className={({ isActive }) =>
								`${
									isActive
										? 'bg-neutral-700 text-white'
										: 'text-neutral-400'
								} inline-block rounded p-2 transition-colors hover:text-neutral-100`
							}
						>
							{menu.icon}
							{/* <span>{menu.name}</span> */}
						</NavLink>
					</li>
				))}
				<NavLink
					to='profile'
					className={({ isActive }) =>
						`${
							isActive ? 'bg-neutral-700' : 'hover:bg-neutral-700'
						} flex items-center gap-2 rounded px-4 py-[0.4rem]`
					}
				>
					<img
						src='https://images.pexels.com/photos/2777898/pexels-photo-2777898.jpeg?auto=compress&cs=tinysrgb&w=600'
						alt=''
						className='object-fit h-7 w-7 rounded-full'
					/>
					<div className='text-xs'>
						<h3 className='font-semibold text-neutral-200'>
							Williams Samuel
						</h3>
						<p className='text-[0.65rem] text-neutral-400'>
							Business Owner
						</p>
					</div>
				</NavLink>
			</ul>
		</nav>
	)
}
