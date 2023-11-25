const headers = ['Order ID', 'Date/Time', 'Status', 'Paid status', 'Amount']

const orders = [
	{
		id: 1,
		order_id: 'hc-ej8e5aw',
		date: 'July 10, 2023 @ 1:05pm',
		status: 'pending',
		amount: 150000,
		paid: 'paid',
	},
	{
		id: 2,
		order_id: 'hc-ewa962as',
		date: 'July 10, 2023 @ 2:05pm',
		status: 'delivered',
		amount: 15000,
		paid: 'fail',
	},
]

const order_statuses = {
	pending: 'bg-amber-200 text-amber-500',
	delivered: 'bg-green-200 text-green-500',
	cancelled: 'bg-red-200 text-red-500',
}

// const paid_statuses = {
// 	paid: 'bg-green-200 text-green-500',
// 	fail: 'bg-red-200 text-red-500',
// }

export const CustomerOrderHistory = () => {
	return (
		<div className='rounded-md border border-neutral-200 bg-neutral-100 p-6'>
			<h3 className='w-max rounded text-xs font-bold uppercase tracking-wider text-neutral-800'>
				Order History
			</h3>

			<table className='mt-6 w-full whitespace-nowrap rounded text-left text-sm'>
				<thead>
					<tr className='border-b-2 border-b-neutral-300 bg-neutral-200 text-xs uppercase tracking-wide'>
						{headers.map(header => (
							<th
								className='p-4 font-medium last:text-right'
								key={header}
							>
								{header}
							</th>
						))}
					</tr>
				</thead>

				<tbody>
					{orders.map(order => (
						<tr key={order.id} className='border-b-200 border-b-2'>
							<td className='flex items-center gap-2 px-4 py-3'>
								{order.order_id}
							</td>
							<td className='px-4 py-3'>{order.date}</td>
							{/* <td className='px-4 py-3'>{item.last_name}</td> */}
							<td className='px-4 py-3'>
								<span
									className={`rounded-md px-3 py-1 text-xs font-semibold uppercase ${
										order_statuses[
											order.status as keyof typeof order_statuses
										]
									}`}
								>
									{order.status}
								</span>
							</td>
							<td className='flex items-center gap-1 px-4 py-3 capitalize'>
								<span className='block h-2 w-2 rounded-full bg-green-600' />
								<span>{order.paid}</span>
							</td>
							<td className='px-4 py-3 text-right font-medium'>
								{order.amount.toLocaleString()}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
