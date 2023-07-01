import { DotsThreeOutline, Trash } from '@phosphor-icons/react'
import * as Popover from '@radix-ui/react-popover'
import { useForm } from 'react-hook-form'
import { TextInput } from '../ui/TextInput'
import { EditVariantForm } from './EditVariantForm'

const headers = ['Variant', 'Options', 'Actions']

const data = [
	{
		id: 1,
		name: 'Colors',
		options: ['Red', 'Yellow', 'Pink'],
	},
	{
		id: 2,
		name: 'Size',
		options: ['6', '5', '8'],
	},
]

export const ProductVariants = () => {
	const { control, register } = useForm({})

	return (
		<>
			{/* show if user has not added varaint before */}
			{/* <div className='mt-4 space-y-2 rounded-md bg-neutral-700 p-3 text-xs text-neutral-200'>
						<p>
							Variants help you to sell products with slight differences,
							but are still the same product. For example, you might sell
							a t-shirt in different colors, or a plant pot in different
							sizes.
						</p>
						<p>
							To get started, create groups and options for your
							variants. Groups define the type of variant (e.g. color).
							Options are a choice your customer can make within that
							group (e.g. blue).
						</p>
					</div> */}

			<table className='w-full whitespace-nowrap rounded text-left text-sm'>
				<thead>
					<tr className='border-b-2 border-b-neutral-300 bg-neutral-200 text-xs uppercase tracking-wide'>
						{headers.map(header => (
							<th className='p-4 font-medium first:w-[35%] last:text-right'>
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
							<td className='flex items-center gap-2 px-4 py-2'>
								{item.name}
							</td>
							<td className='px-4 py-2'>{item.options.join(', ')}</td>
							<td className='px-4 py-2 text-right'>
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
												<EditVariantForm />
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

			<form className='mt-8'>
				<div className='flex items-center gap-2 pt-1'>
					<TextInput
						control={control}
						register={register}
						name='group'
						type='text'
						label='Group (e.g Size, Colour)'
					/>
					<TextInput
						control={control}
						register={register}
						name='options'
						type='text'
						label='Options (e.g Red, Green)'
					/>
				</div>

				<button
					type='submit'
					className='mt-2 rounded bg-neutral-800 px-6 py-2 text-sm text-white transition-all hover:bg-neutral-700'
				>
					Add Variant
				</button>
			</form>
		</>
	)
}
