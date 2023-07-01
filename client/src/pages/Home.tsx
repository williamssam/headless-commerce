import { zodResolver } from '@hookform/resolvers/zod'
import { SignIn } from '@phosphor-icons/react'
import { Button } from 'components/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TextInput } from 'ui/TextInput'
import { z } from 'zod'

const schema = z.object({
	email: z
		.string({
			required_error: 'Email address is required',
		})
		.email({ message: 'Invalid email address' })
		.trim(),
	password: z
		.string({
			required_error: 'Password is required',
		})
		.min(6, { message: 'Password must be at least 6 characters' }),
})

type LoginSchema = z.infer<typeof schema>

export const Home = () => {
	const { control, register, handleSubmit } = useForm<LoginSchema>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: zodResolver(schema),
	})

	const onSubmit: SubmitHandler<LoginSchema> = data => {
		console.log('data', data)
	}

	return (
		<main className='grid min-h-screen bg-neutral-900 bg-[url("https://images.pexels.com/photos/194094/pexels-photo-194094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")] bg-cover p-6'>
			<section className='my-auto w-max'>
				<div className='rounded-md border border-neutral-300 bg-white/40 p-8 drop-shadow-xl backdrop-blur-sm'>
					<h1 className='text-2xl font-black'>
						Welcome to{' '}
						<span className='rounded bg-neutral-700 px-3 py-1 capitalize text-neutral-100'>
							headless commerce
						</span>
					</h1>
					<p className='pt-1 text-sm text-neutral-700'>
						An headless ecommerce cms for your ecommerce website.
					</p>
				</div>

				<form
					className='mt-6 rounded-md bg-white p-8 drop-shadow-2xl'
					onSubmit={handleSubmit(onSubmit)}
				>
					<div>
						<h2 className='text-2xl font-bold'>Welcome back</h2>
						<p className='text-sm'>Login to your admin dashboard.</p>
					</div>
					<div className='space-y-6 pt-6'>
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
							name='password'
							type='password'
							label='Password'
						/>

						<Button
							type='submit'
							text='Login'
							icon={<SignIn size={16} weight='fill' />}
							className='w-full'
							// onClick={handleSubmit(saveChanges)}
							variant='primary'
						/>
					</div>
				</form>
			</section>
		</main>
	)
}
