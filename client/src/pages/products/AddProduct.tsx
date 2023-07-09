import { FloppyDisk } from '@phosphor-icons/react'
import { Button } from 'components/Button'
import { InfoTooltip } from 'components/InfoTooltip'
import { PageHeader } from 'components/PageHeader'
import { ProductVariants } from 'components/ProductVariants'
import { useForm } from 'react-hook-form'
import { Alert } from 'ui/Alert'
import { TextInput } from 'ui/TextInput'

export const AddProduct = () => {
	const { control, register } = useForm({})

	return (
		<>
			<PageHeader title='Add Product' hasBackBtn backText='Products' />

			<form className='mx-auto grid max-w-7xl grid-cols-4 gap-6 py-10'>
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
									name='permalink'
									type='text'
									label='Permalink'
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
									label='SKU'
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
								label='Description'
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

						<Alert variant='info' className='mt-4'>
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
