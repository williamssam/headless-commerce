import {
	DotsThreeOutline,
	PencilSimpleLine,
	Trash,
} from '@phosphor-icons/react'
import * as Popover from '@radix-ui/react-popover'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../ui/Tooltip'
import { AddCors } from './AddCors'

const headers = [
	'Environment',
	'Api key label',
	'Api key',
	'Api version',
	'Options',
]

const data = [
	{
		id: 1,
		environment: 'live',
		label: '',
		api_key: 'pk_49268ff7411ef79edc4d270106363aa8ceac81bc0741f',
		version: '2022-07-21',
	},
	{
		id: 2,
		environment: 'sandbox',
		label: '',
		api_key: 'pk_49268ff7411ef79edc4d270106363aa8ceac81bc0741f',
		version: '2022-07-21',
	},
]

const environmentStyles = {
	live: 'bg-purple-200 text-purple-600',
	sandbox: 'bg-pink-200 text-pink-600',
}

export const Developer = () => {
	return (
		<>
			<section>
				<h3 className='text-xl font-bold'>Api Keys</h3>

				<table className='mt-5 w-full whitespace-nowrap rounded text-left text-sm'>
					<thead>
						<tr className='border-b-2 border-b-neutral-300 bg-neutral-200 text-xs uppercase tracking-wide [&>*:nth-child(4)]:text-center [&>*:nth-child(5)]:text-right'>
							{headers.map(header => (
								<th className='p-4 font-medium' key={header}>
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
									<span
										className={`rounded-md px-2 py-[2px] text-xs font-semibold uppercase tracking-wider ${
											environmentStyles[
												item.environment as keyof typeof environmentStyles
											]
										}`}
									>
										{item.environment}
									</span>
								</td>
								<td className='px-4 py-3'>{item.label}</td>
								<td className='px-4 py-3'>
									<TooltipProvider delayDuration={200}>
										<Tooltip>
											<TooltipTrigger asChild>
												<button
													type='button'
													className='rounded-md bg-neutral-200 px-3 py-1 text-xs font-semibold text-neutral-600'
												>
													{item.api_key}
												</button>
											</TooltipTrigger>
											<TooltipContent>
												<p>Click to copy</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</td>
								<td className='px-4 py-3 text-center'>
									{item.version}
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
														// onClick={() => setOpen(true)}
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

			<AddCors />
		</>
	)
}
