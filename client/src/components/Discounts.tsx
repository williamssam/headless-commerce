import {
	DotsThreeOutline,
	FloppyDisk,
	PencilSimpleLine,
	Plus,
	Trash,
} from '@phosphor-icons/react'
import * as Popover from '@radix-ui/react-popover'
import { useForm } from 'react-hook-form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/Select'
import { TextInput } from '../ui/TextInput'
import { Button } from './Button'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from './Drawer'

const headers = ['Code', 'Start date', 'Expires', 'Quantity', 'Options']

const data = [
	{
		id: 1,
		code: 'F7A267F08B',
		percent: '50',
		price: '',
		start_date: '06/09/2023',
		end_date: '01/10/2023',
		quantity: '3',
	},
	{
		id: 1,
		code: 'F7A267F08B',
		percent: '',
		price: '100',
		start_date: '06/09/2023',
		end_date: '01/10/2023',
		quantity: '∞',
	},
]

export const Discounts = () => {
	const { control, register } = useForm({})

	return (
		<>
			<Drawer>
				<DrawerTrigger
					type='button'
					className='items-cener ml-auto flex gap-[2px] rounded-md bg-neutral-800 px-3 py-1 text-xs font-medium text-neutral-100 hover:opacity-90'
				>
					<Plus size={14} />
					<span>Add</span>
				</DrawerTrigger>

				<DrawerContent>
					<DrawerTitle>Add Discount</DrawerTitle>

					<form className='mt-10 space-y-6'>
						<TextInput
							control={control}
							register={register}
							name='discount_code'
							type='text'
							label='Product name (required)'
						/>

						<TextInput
							control={control}
							register={register}
							name='amount'
							type='number'
							label='Amount'
							isCurrency
						/>
						<TextInput
							control={control}
							register={register}
							name='quantity'
							type='number'
							label='Quantity'
						/>

						<TextInput
							control={control}
							register={register}
							name='start_date'
							type='date'
							label='Start date'
						/>
						<TextInput
							control={control}
							register={register}
							name='end_date'
							type='date'
							label='Expires'
						/>
						<TextInput
							control={control}
							register={register}
							name='products'
							type='text'
							label='Limit to these products'
							tooltipText='If left empty, this discount will work for all products.'
						/>
						<Button
							type='submit'
							text='Save changes'
							icon={<FloppyDisk size={16} weight='fill' />}
							className='w-full bg-orange-600 hover:bg-orange-700'
							// onClick={handleSubmit(saveChanges)}
							variant='primary'
						/>
					</form>
				</DrawerContent>
			</Drawer>

			<table className='mt-3 w-full whitespace-nowrap rounded text-left text-sm'>
				<thead>
					<tr className='border-b-2 border-b-neutral-300 bg-neutral-200 text-xs uppercase tracking-wide [&>*:nth-child(4)]:text-center [&>*:nth-child(5)]:text-right'>
						{headers.map(header => (
							<th className='p-4 font-medium'>{header}</th>
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
								{item.code}
							</td>
							<td className='px-4 py-3'>{item.start_date}</td>
							<td className='px-4 py-3'>{item.end_date}</td>
							<td className='px-4 py-3 text-center'>{item.quantity}</td>
							{/* <td className='px-4 py-3 text-center'>
									{item.total_spent}
								</td> */}
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

			<Select>
				<SelectTrigger className='w-[180px]'>
					<SelectValue placeholder=' ' />
				</SelectTrigger>

				<SelectContent className='w-[180px]'>
					{/* <SelectLabel>Fruits</SelectLabel> */}
					<SelectItem value='apple'>Apple</SelectItem>
					<SelectItem value='banana'>Banana</SelectItem>
					<SelectItem value='blueberry'>Blueberry</SelectItem>
					<SelectItem value='grapes'>Grapes</SelectItem>
					<SelectItem value='pineapple'>Pineapple</SelectItem>
				</SelectContent>
			</Select>
		</>
	)
}
