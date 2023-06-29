import {
	DotsThreeOutline,
	PencilSimpleLine,
	Trash,
} from '@phosphor-icons/react'
import * as Popover from '@radix-ui/react-popover'
import { PageHeader } from 'components/PageHeader'

const headers = ['Category name', 'Slug', 'Options']
const data = [
	{
		id: 1,
		name: 'Men wear',
		permalink: 'men-wear',
	},
	{
		id: 2,
		name: 'Women wear',
		permalink: 'women-wear',
	},
]

export const Categories = () => {
	// const [isOpen, setIsOpen] = React.useState(false)

	return (
		<>
			<PageHeader
				breadcrumb='Home / Categories'
				title='Categories'
				hasAdd
				to='add'
			/>

			<section className='mx-auto max-w-7xl py-10'>
				<table className='mt-3 w-full whitespace-nowrap rounded text-left text-sm'>
					<thead>
						<tr className='border-b-2 border-b-neutral-300 bg-neutral-200 text-xs uppercase tracking-wide'>
							{headers.map(header => (
								<th className='p-4 font-medium first:w-1/2 last:text-right'>
									{header}
								</th>
							))}
						</tr>
					</thead>

					<tbody>
						{data.map(item => (
							<tr
								key={item.id}
								className='border-b-200 border-b-2 last:border-none even:bg-neutral-50'
							>
								<td className='flex items-center gap-2 px-4 py-3'>
									{item.name}
								</td>
								<td className='px-4 py-3'>
									<span className='rounded-md bg-neutral-300 px-2 py-1 text-xs font-medium'>
										{item.permalink}
									</span>
								</td>
								<td className='px-4 py-3 text-right'>
									<Popover.Root>
										<Popover.Trigger asChild>
											<button
												type='button'
												className='ml-auto grid h-6 w-7 place-items-center rounded-md bg-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-300'
											>
												<DotsThreeOutline size={18} weight='fill' />
											</button>
										</Popover.Trigger>
										<Popover.Portal>
											<Popover.Content
												className='w-max rounded-md bg-white p-1 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade'
												sideOffset={5}
											>
												<div className='space-y-1 text-sm text-neutral-700'>
													<button
														type='button'
														className='flex w-full items-center gap-2 rounded bg-blue-50 px-4 py-1 text-blue-600 transition-colors hover:bg-blue-600 hover:text-white'
													>
														<PencilSimpleLine
															size={16}
															weight='fill'
														/>
														<span>Edit</span>
													</button>
													<button
														type='button'
														className='flex w-full items-center gap-2 rounded bg-red-50 px-4 py-1 text-red-600 transition-colors hover:bg-red-600 hover:text-white'
													>
														<Trash size={16} weight='fill' />
														<span>Delete</span>
													</button>
												</div>
												<Popover.Arrow className='fill-white' />
											</Popover.Content>
										</Popover.Portal>
									</Popover.Root>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</section>

			{/* <AlertModal isOpen={isOpen} setIsOpen={setIsOpen} /> */}
		</>
	)
}
