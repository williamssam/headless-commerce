import {
	DotsThreeOutline,
	PencilSimpleLine,
	Plus,
	Trash,
} from '@phosphor-icons/react'
import * as Popover from '@radix-ui/react-popover'
import { useForm } from 'react-hook-form'
import { Alert } from 'ui/Alert'
import { TextInput } from 'ui/TextInput'
import { Button } from './Button'

const headers = ['id', 'Url', 'Options']

const data = [
	{
		id: 1,
		url: 'https:lavidluxe.com',
	},
]

export const AddCors = () => {
	const { control, register } = useForm({})

	return (
		<section className='mt-16'>
			<h3 className='text-xl font-bold'>
				Cross-Origin Resource Sharing (CORS) origins
			</h3>

			<form className='mt-5 grid grid-cols-3 gap-6'>
				<fieldset className='col-span-2 space-y-6 rounded-md border p-6'>
					<Alert variant='warning'>
						<p>
							You may configure a list of trusted domains (including the
							scheme and port) for CORS headers when using public API
							keys. If you configure one domain, all API responses will
							use that domain in the "Access-Control-Allow-Origin"
							header. If you specify multiple, API calls will compare
							against the request "Origin" header. If you leave this
							blank, all origins will be allowed (default).
						</p>
					</Alert>

					<div className='space-y-3'>
						<TextInput
							control={control}
							register={register}
							name='cors'
							type='url'
							label='CORS origins'
							inputMode='url'
						/>

						<Button
							type='submit'
							text='Add'
							icon={<Plus size={16} weight='fill' />}
							// onClick={handleSubmit(saveChanges)}
							variant='primary'
						/>
					</div>

					<table className='mt-5 w-full whitespace-nowrap rounded text-left text-sm'>
						<thead>
							<tr className='border-b-2 border-b-neutral-300 bg-neutral-200 text-xs uppercase tracking-wide [&>*:nth-child(2)]:w-1/2'>
								{headers.map(header => (
									<th className='p-4 font-medium last:text-right'>
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
										{item.id}
									</td>
									<td className='px-4 py-3'>{item.url}</td>
									<td className='px-4 py-3 text-right'>
										<Popover.Root>
											<Popover.Trigger asChild>
												<button
													type='button'
													className='ml-auto grid h-6 w-7 place-items-center rounded-md bg-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-300'
												>
													<DotsThreeOutline
														size={18}
														weight='fill'
													/>
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
				</fieldset>

				{/* <Button
					type='submit'
					text='Save changes'
					icon={<FloppyDisk size={16} weight='fill' />}
					className='h-max w-full'
					// onClick={handleSubmit(saveChanges)}
					variant='primary'
				/> */}
			</form>
		</section>
	)
}
