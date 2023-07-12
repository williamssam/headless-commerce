import { zodResolver } from '@hookform/resolvers/zod'
import { FloppyDisk, Trash } from '@phosphor-icons/react'
import { Button } from 'components/Button'
import { PageHeader } from 'components/PageHeader'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Alert } from 'ui/Alert'
import { TextInput } from 'ui/TextInput'
import { z } from 'zod'

const allowedExtension = ['image/jpeg', 'image/jpg', 'image/png']
const schema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(1, { message: 'Name is required' })
		.trim(),
	permalink: z
		.string({ required_error: 'Permalink is required' })
		.min(1, { message: 'Permalink is required' })
		.trim(),
	description: z
		.string({ required_error: 'Description is required' })
		.min(1, { message: 'Description is required' })
		.min(10, { message: 'Description cannot be less than 10 characters' })
		.trim()
		.default(''),
	category_image: z
		.instanceof(FileList, {
			message: 'Please select an image file not more than 1mb',
		})
		.superRefine((val, ctx) => {
			if (val.length === 0) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Please select an image file not more than 1mb',
				})
			}
			if (val[0]?.size > 300000) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: `Image cannot be larger than 300kb`,
				})
			}
			if (!val[0]?.type.includes('image')) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: `You can only upload image.`,
				})
			}
			if (!allowedExtension.includes(val[0]?.type)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: `Only jpg, jpeg and png are allowed`,
				})
			}
		}),
})

export type AddCategorySchema = z.infer<typeof schema>

export const AddCategory = () => {
	const { control, register, handleSubmit } = useForm<AddCategorySchema>({
		defaultValues: {},
		resolver: zodResolver(schema),
	})

	const saveChanges: SubmitHandler<AddCategorySchema> = data => {
		console.log('data', data)
	}

	return (
		<>
			<PageHeader title='Add Category' hasBackBtn backText='Categories' />

			<form className='mx-auto grid max-w-7xl grid-cols-6 gap-10 py-10'>
				<div className='col-span-3 space-y-8'>
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
								label='Name'
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
							<TextInput
								control={control}
								register={register}
								name='description'
								type='textarea'
								label='Description'
							/>
						</div>
					</fieldset>

					<fieldset className='rounded-md border p-6'>
						<legend className='rounded bg-neutral-800 px-6 py-1 text-xs font-bold uppercase tracking-widest text-white'>
							Product Image(s)
						</legend>

						<TextInput
							control={control}
							register={register}
							name='category_image'
							type='file'
							label=''
						/>

						<Alert variant='warning' className='mt-4'>
							<p>
								<strong>NOTE:</strong> You cannot upload more than three
								(1) image for a category.
							</p>
						</Alert>
					</fieldset>
				</div>

				<div className='col-span-2 space-y-8'>
					<div className='rounded-md border border-neutral-200 bg-white px-6 py-8'>
						<h3 className='text-xs font-bold uppercase tracking-widest text-neutral-500'>
							Sub-Categories
						</h3>
						<button
							type='button'
							className='flex items-center gap-2 rounded bg-neutral-900 px-3 py-1 text-sm text-neutral-100 transition-colors hover:bg-neutral-800'
						>
							{/* <Copy size={14} weight='fill' /> */}
							<span>Copy</span>
						</button>
					</div>

					<div className='flex items-center gap-4'>
						<Button
							type='submit'
							text='Save changes'
							icon={<FloppyDisk size={16} weight='fill' />}
							onClick={handleSubmit(saveChanges)}
							variant='primary'
						/>
						<Button
							icon={<Trash size={16} weight='fill' />}
							text='Delete category'
							type='button'
							variant='secondary'
						/>
					</div>
				</div>
			</form>
		</>
	)
}
