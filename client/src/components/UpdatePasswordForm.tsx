import { FloppyDisk } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { Button } from './Button'
import { TextInput } from './TextInput'

export const UpdatePasswordForm = () => {
	const { control, register } = useForm({})

	return (
		<form className='space-y-6' autoComplete='off' autoCorrect='off'>
			<fieldset className='rounded-md border p-6'>
				<legend className='rounded bg-neutral-800 px-6 py-1 text-xs font-bold uppercase tracking-widest text-white'>
					Business details
				</legend>

				<div className='space-y-3'>
					<TextInput
						control={control}
						register={register}
						name='current_password'
						type='password'
						label='Current password'
					/>
					<TextInput
						control={control}
						register={register}
						name='new_password'
						type='password'
						label='New password'
					/>
				</div>
				<button
					type='button'
					className='pt-2 text-xs font-medium uppercase tracking-wider text-blue-600'
				>
					Show password
				</button>
			</fieldset>

			<Button
				type='submit'
				text='Save changes'
				icon={<FloppyDisk size={16} weight='fill' />}
				// onClick={handleSubmit(saveChanges)}
				variant='primary'
			/>
		</form>
	)
}
