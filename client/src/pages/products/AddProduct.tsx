import { zodResolver } from '@hookform/resolvers/zod'
import { FloppyDisk } from '@phosphor-icons/react'
import { Button } from 'components/Button'
import { InfoTooltip } from 'components/InfoTooltip'
import { PageHeader } from 'components/PageHeader'
import { ProductVariants } from 'components/ProductVariants'
import React from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { Alert } from 'ui/Alert'
import { TextInput } from 'ui/TextInput'
import { z } from 'zod'

const schema = z.object({
	name: z.string().min(1, { message: 'Product name is required' }),
	slug: z.string().min(1, { message: 'Slug is required' }),
	sku: z.string().min(1, { message: 'SKU is required' }).or(z.literal('')),
	inventory_available: z.number().optional().default(0),
	description: z
		.string()
		.min(1, { message: 'Description is required' })
		.min(10, { message: 'Description must be at least 10 characters long' }),
	price: z.number().min(1, { message: 'Price is required' }),
	category: z.string().min(1, { message: 'Category is required' }),
})

export type AddProductFormValues = z.infer<typeof schema>

export const AddProduct = () => {
	const { control, register, handleSubmit, setValue, formState } = useForm({
		resolver: zodResolver(schema),
	})

	const productName = useWatch({
		control,
		name: 'name',
	})

	React.useEffect(() => {
		if (formState.touchedFields.name) {
			setValue('slug', productName?.replace(/\W+/g, '-').toLowerCase(), {
				shouldTouch: true,
			})
		}
	}, [formState.touchedFields.name, productName, setValue])

	return (
		<>
			<PageHeader title='Add Product' hasBackBtn backText='Products' />

			<form
				className='mx-auto grid max-w-6xl grid-cols-4 gap-6 py-10'
				onSubmit={handleSubmit(data => console.log(data))}
			>
				<div className='col-span-2 space-y-8'>
					<fieldset className='rounded-md border p-6'>
						<legend className='rounded bg-neutral-800 px-6 py-1 text-xs font-bold uppercase tracking-widest text-white'>
							Details
						</legend>

						<div className='space-y-3'>
							<TextInput
								control={control}
								register={register}
								name='name'
								type='text'
								label='Product name (required)'
							/>

							<div className='relative w-full'>
								<TextInput
									control={control}
									register={register}
									name='slug'
									type='text'
									label='Slug (required)'
								/>
								<button
									type='button'
									className='absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-neutral-800 px-3 py-1 text-xs font-medium uppercase text-white'
								>
									Generate
								</button>
							</div>

							<div className='flex items-center gap-4'>
								<TextInput
									control={control}
									register={register}
									name='sku'
									type='text'
									label='SKU - Stock Keeping Unit'
								/>

								<div className='relative w-full'>
									<TextInput
										control={control}
										register={register}
										name='inventory_available'
										type='number'
										label='Inventory available'
										inputMode='numeric'
									/>
									<InfoTooltip
										text='With inventory you can set the number of available items, otherwise if you leave it empty, it will be unlimited.'
										className='absolute right-2 top-1/2 -translate-y-1/2'
									/>
								</div>
							</div>

							<TextInput
								control={control}
								register={register}
								name='description'
								type='textarea'
								label='Description (required)'
							/>
						</div>
					</fieldset>

					{/* price */}
					<fieldset className='rounded-md border p-6'>
						<legend className='rounded bg-neutral-800 px-6 py-1 text-xs font-bold uppercase tracking-widest text-white'>
							Price
						</legend>

						<div className='space-y-3'>
							<TextInput
								control={control}
								register={register}
								name='name'
								type='number'
								inputMode='numeric'
								label='Price (required)'
								isCurrency
							/>
						</div>
					</fieldset>

					{/* variants */}
					<fieldset className='rounded-md border p-6'>
						<legend className='rounded bg-neutral-800 px-6 py-1 text-xs font-bold uppercase tracking-widest text-white'>
							Variants
						</legend>

						<ProductVariants />
					</fieldset>

					{/* Images */}
					<fieldset className='rounded-md border p-6'>
						<legend className='rounded bg-neutral-800 px-6 py-1 text-xs font-bold uppercase tracking-widest text-white'>
							Product Image(s)
						</legend>

						<TextInput
							control={control}
							register={register}
							name='product_images'
							type='file'
							label=''
						/>

						<Alert variant='warning' className='mt-4'>
							<p>
								<strong>NOTE:</strong> You cannot upload more than three
								(3) images for a product.
							</p>
						</Alert>
					</fieldset>

					{/* seo */}
					<fieldset className='rounded-md border p-6'>
						<legend className='rounded bg-neutral-800 px-6 py-1 text-xs font-bold uppercase tracking-widest text-white'>
							Misc
						</legend>

						<div className='space-y-3'>
							<TextInput
								control={control}
								register={register}
								name='seo_title'
								type='text'
								label='Search engine title'
							/>
							<TextInput
								control={control}
								register={register}
								name='seo_desc'
								type='textarea'
								label='Search engine description'
							/>
						</div>
					</fieldset>
				</div>
				<div className='col-span-1 space-y-8'>
					<fieldset className='w-full rounded-md border p-4'>
						<legend className='rounded bg-neutral-800 px-6 py-1 text-xs font-bold uppercase tracking-widest text-white'>
							Category
						</legend>

						<div className='space-y-3'>
							<TextInput
								control={control}
								register={register}
								name='category'
								type='text'
								label='Category'
							/>
						</div>
					</fieldset>

					<Button
						type='submit'
						text='Save changes'
						icon={<FloppyDisk size={16} weight='fill' />}
						className='w-full'
						// onClick={handleSubmit(saveChanges)}
						variant='primary'
					/>
				</div>
			</form>
		</>
	)
}
