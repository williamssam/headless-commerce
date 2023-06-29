import { zodResolver } from '@hookform/resolvers/zod'
import { Copy, FloppyDisk, Trash } from '@phosphor-icons/react'
import { Alert } from 'components/Alert'
import { Button } from 'components/Button'
import { TextInput } from 'components/TextInput'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
	owners_name: z
		.string({ required_error: 'Owners name is required' })
		.min(1, { message: 'Owners name is required' })
		.trim(),
	owners_email: z
		.string({ required_error: 'Owners email is required' })
		.min(1, { message: 'Owners email is required' })
		.email({ message: 'Please enter a valid email address' })
		.trim(),
	business_name: z
		.string({ required_error: 'Business name is required' })
		.min(1, { message: 'Business name is required' })
		.trim(),
	email: z
		.string({ required_error: 'Email is required' })
		.min(1, { message: 'Email address is required' })
		.email({ message: 'Please enter a valid email address' })
		.trim(),
	description: z
		.string({ required_error: 'Description is required' })
		.min(1, { message: 'Description is required' })
		.min(10, { message: 'Description cannot be less than 10 characters' })
		.trim()
		.default(''),
	address: z
		.string({ required_error: 'Address is required' })
		.min(1, { message: 'Address is required' })
		.trim()
		.default(''),
	city: z
		.string({ required_error: 'City is required' })
		.min(1, { message: 'City is required' })
		.trim()
		.default(''),
	state: z
		.string({ required_error: 'State is required' })
		.min(1, { message: 'State is required' })
		.trim()
		.default(''),
	postal_code: z
		.string({ required_error: 'Postal Code is required' })
		.min(1, { message: 'Postal Code is required' })
		.trim()
		.default(''),
	country: z
		.string({ required_error: 'Country is required' })
		.min(1, { message: 'Country is required' })
		.trim()
		.default(''),
	currency: z
		.string({ required_error: 'Currency is required' })
		.min(1, { message: 'Currency is required' })
		.trim()
		.default(''),
})

export type ProfileSchema = z.infer<typeof schema>

export const ProfileForm = () => {
	const { control, register, handleSubmit } = useForm<ProfileSchema>({
		defaultValues: {},
		resolver: zodResolver(schema),
	})

	const saveChanges: SubmitHandler<ProfileSchema> = data => {
		console.log('data', data)
	}

	return (
		<section className='grid grid-cols-3 gap-6'>
			<form className='col-span-2 space-y-8'>
				<fieldset className='rounded-md border p-6'>
					<legend className='rounded bg-neutral-800 px-6 py-1 text-xs font-bold uppercase tracking-widest text-white'>
						Account Owner
					</legend>

					<div className='space-y-3'>
						<TextInput
							control={control}
							register={register}
							name='owners_name'
							type='text'
							label='Owners name'
						/>

						<TextInput
							control={control}
							register={register}
							name='owners_email'
							type='email'
							label='Owners email'
							tooltipText='This email is associated with your account. You will receive order notifications and account information at this email.'
						/>
					</div>
				</fieldset>

				<fieldset className='rounded-md border p-6'>
					<legend className='rounded bg-neutral-800 px-6 py-1 text-xs font-bold uppercase tracking-widest text-white'>
						Business details
					</legend>

					<div className='space-y-3'>
						<TextInput
							control={control}
							register={register}
							name='business_name'
							type='text'
							label='Business name'
							tooltipText='What name are you selling under?'
						/>
						<TextInput
							control={control}
							register={register}
							name='email'
							type='email'
							label='Email address'
						/>
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
						Address
					</legend>
					<div className='space-y-3'>
						<TextInput
							control={control}
							register={register}
							name='address'
							type='text'
							label='Address'
						/>
						<div className='flex items-center gap-2'>
							<TextInput
								control={control}
								register={register}
								name='city'
								type='text'
								label='City'
							/>
							<TextInput
								control={control}
								register={register}
								name='state'
								type='text'
								label='State/Province'
							/>
						</div>
						<div className='flex items-center gap-2'>
							<TextInput
								control={control}
								register={register}
								name='postal_code'
								type='text'
								label='Postal Code'
							/>
							<TextInput
								control={control}
								register={register}
								name='country'
								type='text'
								label='Country'
							/>
						</div>
					</div>
				</fieldset>

				<fieldset className='rounded-md border p-6'>
					<legend className='rounded bg-neutral-800 px-6 py-1 text-xs font-bold uppercase tracking-widest text-white'>
						Currency
					</legend>
					<TextInput
						control={control}
						register={register}
						name='currency'
						type='text'
						label='Currency'
					/>
				</fieldset>

				<Button
					type='submit'
					text='Save changes'
					icon={<FloppyDisk size={16} weight='fill' />}
					onClick={handleSubmit(saveChanges)}
					variant='primary'
				/>
			</form>

			<div className='col-span-1 space-y-8'>
				<div className='rounded-md border border-neutral-200 bg-white px-6 py-8'>
					<h3 className='text-xs font-bold uppercase tracking-widest text-neutral-500'>
						Business ID
					</h3>
					<div className='mt-4 flex items-center justify-between gap-2 rounded-md border border-neutral-300 bg-neutral-200 px-4 py-3'>
						<p className='font-bold'>#49268</p>
						<button
							type='button'
							className='flex items-center gap-2 rounded bg-neutral-900 px-3 py-1 text-sm text-neutral-100 transition-colors hover:bg-neutral-800'
						>
							<Copy size={14} weight='fill' />
							<span>Copy</span>
						</button>
					</div>

					<p className='pt-2 text-xs'>
						This is your unique merchant ID. We may ask for it when you
						contact us.
					</p>
				</div>

				<div className='rounded-md border border-neutral-200 bg-white px-6 py-8'>
					<h3 className='text-xs font-bold uppercase tracking-widest text-neutral-500'>
						Delete Account
					</h3>

					<Alert
						variant='danger'
						text='Deleting accont is permanent and cannot be reversed.'
						className='my-4'
					/>

					<Button
						icon={<Trash size={16} weight='fill' />}
						text='Delete account'
						type='button'
						variant='secondary'
					/>
				</div>
			</div>
		</section>
	)
}
