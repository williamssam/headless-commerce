import {
	CurrencyNgn,
	ShoppingBag,
	ShoppingBagOpen,
} from '@phosphor-icons/react'

const metrics = [
	{
		id: 1,
		name: 'Total sales',
		value: 185896,
		icon: <CurrencyNgn size={20} weight='fill' />,
	},
	{
		id: 2,
		name: 'Total orders',
		value: 279789,
		icon: <ShoppingBagOpen size={20} weight='fill' />,
	},
	{
		id: 3,
		name: 'Total products',
		value: 185896,
		icon: <ShoppingBag size={20} weight='fill' />,
	},
	{
		id: 4,
		name: 'Total products',
		value: 185896,
		icon: <ShoppingBag size={20} weight='fill' />,
	},
]

export const Metrics = () => {
	return (
		<div className='-mt-14 grid grid-cols-fluid gap-5'>
			{metrics.map(metric => (
				<div
					key={metric.id}
					className='rounded-md bg-neutral-100 p-6 drop-shadow-2xl'
				>
					<div className='grid h-8 w-8 place-items-center rounded bg-neutral-800 text-white'>
						{metric.icon}
					</div>
					<h4 className='pt-2 text-4xl font-bold'>
						{metric.value.toLocaleString()}
					</h4>
					<p className='text-sm font-medium text-neutral-500'>
						{metric.name}
					</p>
				</div>
			))}
		</div>
	)
}
