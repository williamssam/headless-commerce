import { FloppyDisk, PencilSimpleLine } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { Button } from './Button'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from './Drawer'
import { TextInput } from './TextInput'

export const EditVariantForm = () => {
	const { control, register } = useForm({})

	return (
		<Drawer>
			<DrawerTrigger type='button' asChild>
				<button
					type='button'
					className='flex w-full items-center gap-2 rounded bg-blue-50 px-4 py-1 text-blue-600 transition-colors hover:bg-blue-600 hover:text-white'
				>
					<PencilSimpleLine size={16} weight='fill' />
					<span>Advanced</span>
				</button>
			</DrawerTrigger>

			<DrawerContent className='w-[600px]'>
				<DrawerTitle>Edit Variants</DrawerTitle>

				<form className='mt-10 space-y-6'>
					<fieldset className='space-y-3 bg-neutral-700 p-3'>
						<TextInput
							control={control}
							register={register}
							name='option'
							type='text'
							label='Option'
						/>

						<div className='flex items-center gap-2'>
							<TextInput
								control={control}
								register={register}
								name='variant_price'
								type='number'
								label='Variant price'
								isCurrency
							/>

							<TextInput
								control={control}
								register={register}
								name='variant_quantity'
								type='number'
								label='Variant quantity'
							/>
						</div>

						<TextInput
							control={control}
							register={register}
							name='product_images'
							type='file'
							label=''
						/>
					</fieldset>
					<fieldset className='space-y-3 bg-neutral-700 p-3'>
						<TextInput
							control={control}
							register={register}
							name='option'
							type='text'
							label='Option'
						/>

						<div className='flex items-center gap-2'>
							<TextInput
								control={control}
								register={register}
								name='variant_price'
								type='number'
								label='Variant price'
								isCurrency
							/>

							<TextInput
								control={control}
								register={register}
								name='variant_quantity'
								type='number'
								label='Variant quantity'
							/>
						</div>

						<TextInput
							control={control}
							register={register}
							name='product_images'
							type='file'
							label=''
						/>
					</fieldset>
					<fieldset className='space-y-3 bg-neutral-700 p-3'>
						<TextInput
							control={control}
							register={register}
							name='option'
							type='text'
							label='Option'
						/>

						<div className='flex items-center gap-2'>
							<TextInput
								control={control}
								register={register}
								name='variant_price'
								type='number'
								label='Variant price'
								isCurrency
							/>

							<TextInput
								control={control}
								register={register}
								name='variant_quantity'
								type='number'
								label='Variant quantity'
							/>
						</div>

						<TextInput
							control={control}
							register={register}
							name='product_images'
							type='file'
							label=''
						/>
					</fieldset>

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
	)
}
