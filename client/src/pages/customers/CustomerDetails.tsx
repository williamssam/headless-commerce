import { PencilSimpleLine, User } from '@phosphor-icons/react'
import { CustomerOrderHistory } from 'components/CustomerOrderHistory'
import { PageHeader } from 'components/PageHeader'

const metrics = [
	{
		id: 1,
		name: 'Last order',
		value: 10,
	},
	{
		id: 2,
		name: 'Total spent',
		value: 0,
	},
	{
		id: 3,
		name: 'Total orders',
		value: 10,
	},
]

export const CustomerDetails = () => {
	return (
		<>
			<PageHeader
				title='Customer overview'
				hasBackBtn
				backText='Customers'
			/>

			<section className='mx-auto grid max-w-6xl grid-cols-4 gap-6 py-10'>
				<div className='col-span-2 space-y-6'>
					<div className='rounded-md border border-neutral-200 bg-neutral-100 p-6'>
						<header className='flex items-center justify-between gap-2'>
							<div className='flex items-center gap-4'>
								<div className='grid h-9 w-9 place-items-center rounded-full bg-neutral-800 text-white'>
									<User size={16} weight='fill' />
								</div>
								<div>
									<h3 className='text-lg font-medium leading-none'>
										Williams Samuel
									</h3>
									<a
										href='mailto:agba_cooker@yopmail.com'
										className='text-xs leading-none text-blue-600 hover:underline'
									>
										agba_cooker@yopmail.com
									</a>
								</div>
							</div>

							<button
								type='button'
								className='flex items-center gap-1 rounded-md bg-neutral-800 px-3 py-1 text-sm text-white'
							>
								<PencilSimpleLine size={12} weight='fill' />
								<span>Edit</span>
							</button>
						</header>

						<div className='mt-6 rounded border border-neutral-300 bg-neutral-200 px-4 py-6'>
							<ul className='grid grid-cols-3 place-items-center gap-4'>
								{metrics.map(metric => (
									<li key={metric.id} className='text-center'>
										<h4 className='text-[0.65rem] font-medium uppercase tracking-wide'>
											{metric.name}
										</h4>
										<p className='font-bold'>{metric.value}</p>
									</li>
								))}
							</ul>

							<p className='mt-4 border-t border-t-neutral-400 pt-4 text-center text-sm text-neutral-600'>
								Created:{' '}
								<span className='font-medium text-neutral-700'>
									12/22/2022 @ 6:01 PM
								</span>
							</p>
						</div>
					</div>

					{/* <div className='rounded-md border border-neutral-200 bg-neutral-100 p-6'>
						<header className='flex items-center justify-between gap-2'>
							<h3 className='w-max rounded text-xs font-bold uppercase tracking-wider text-neutral-800'>
								Customer addresses
							</h3>

							<button
								type='button'
								className='items-cener flex gap-[2px] rounded-md bg-neutral-800 px-3 py-1 text-xs font-medium text-neutral-100 hover:opacity-90'
							>
								<Plus size={14} />
								<span>Add</span>
							</button>
						</header>
					</div> */}

					<CustomerOrderHistory />
				</div>
				<div className='col-span-1'>
					<div className='rounded-md border border-neutral-200 bg-neutral-100 p-6'>
						<h3 className='w-max rounded text-xs font-bold uppercase tracking-wider text-neutral-800'>
							Delete customer
						</h3>

						<p className='pt-4 text-sm'>This action cannot be undone.</p>
					</div>
				</div>
			</section>
		</>
	)
}
