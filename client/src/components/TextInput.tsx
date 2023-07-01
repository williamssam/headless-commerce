import { FileImage, ShieldWarning } from '@phosphor-icons/react'
import React, { HTMLInputTypeAttribute } from 'react'
import {
	Control,
	FieldValues,
	Path,
	UseFormRegister,
	useController,
} from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { InfoTooltip } from './InfoTooltip'

interface TextFieldProps<T extends FieldValues>
	extends React.ComponentPropsWithoutRef<'input'> {
	label?: React.ReactNode
	type: HTMLInputTypeAttribute | 'textarea'
	name: Path<T>
	className?: string
	control: Control<T>
	register: UseFormRegister<T>
	isCurrency?: boolean
	tooltipText?: string
}

export const TextInput = <T extends FieldValues>({
	label,
	name,
	type,
	className,
	register,
	control,
	isCurrency,
	tooltipText,
	...inputProps
}: TextFieldProps<T>) => {
	const {
		fieldState: { error },
	} = useController({
		name,
		control,
	})

	const renderType = (type: HTMLInputTypeAttribute | 'textarea') => {
		switch (type) {
			case 'textarea':
				return (
					<textarea
						id={name}
						// cols={3}
						rows={3}
						{...register(name)}
						className={`peer block w-full resize-none appearance-none rounded border-0 border-b-2 px-3 pb-2.5 pt-5 text-sm font-medium text-neutral-900 focus:border-blue-600 focus:outline-none focus:ring-0 ${
							error
								? 'border-red-400 bg-red-50'
								: 'border-neutral-300 bg-neutral-50'
						}`}
						placeholder=' '
					/>
				)
			case 'number':
				return (
					<NumericFormat
						displayType='input'
						thousandSeparator=','
						thousandsGroupStyle='thousand'
						prefix={isCurrency ? '₦' : ''}
						placeholder=''
						id={name}
						{...register(name)}
						type='text'
						className={`peer block w-full appearance-none rounded border-0 border-b-2 px-3 pb-2.5 pt-5 text-sm font-medium text-neutral-900 focus:border-blue-600 focus:outline-none focus:ring-0 ${
							error
								? 'border-red-400 bg-red-50'
								: 'border-neutral-300 bg-neutral-50'
						}`}
					/>
				)
			case 'file':
				return (
					<div
						className={`flex h-32 justify-center rounded p-2 ${
							error ? 'bg-red-50' : 'bg-neutral-100'
						}`}
					>
						<input
							type='file'
							multiple
							{...register(name)}
							name='product_images'
							id='product_images'
							className='peer sr-only'
						/>
						<label
							htmlFor='product_images'
							className='flex flex-col items-center justify-center peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-neutral-800'
						>
							<span className='flex w-max items-center gap-2 rounded-md bg-neutral-800 px-4 py-2 text-sm font-medium text-white'>
								<FileImage size={16} weight='fill' />
								Upload image(s)
							</span>
							<span className='pt-1 text-center text-[0.65rem] uppercase tracking-wider'>
								PNG, JPG & GIF ACCEPTED
							</span>
						</label>
					</div>
				)
			default:
				return (
					<input
						type={type}
						id={name}
						{...register(name)}
						className={`peer block w-full appearance-none rounded border-0 border-b-2 px-3 pb-2.5 pt-5 text-sm font-medium text-neutral-900 focus:border-blue-600 focus:outline-none focus:ring-0 ${
							error
								? 'border-red-400 bg-red-50'
								: 'border-neutral-300 bg-neutral-50'
						}`}
						placeholder=' '
						{...inputProps}
					/>
				)
		}
	}

	return (
		<div className='flex w-full flex-col gap-1'>
			<div className='relative w-full'>
				<div className='relative'>
					{renderType(type)}
					<label
						htmlFor={name}
						className={`absolute left-3 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 ${
							error ? 'text-red-500' : 'text-neutral-500'
						}`}
					>
						{label}
					</label>
				</div>

				{tooltipText ? (
					<InfoTooltip
						text={tooltipText}
						className='absolute right-2 top-1/2 -translate-y-1/2'
					/>
				) : null}
			</div>
			{error ? (
				<p className='flex items-center gap-1 text-xs font-medium text-red-600'>
					<ShieldWarning size={15} weight='fill' />
					<span>{error.message}</span>
				</p>
			) : null}
		</div>
	)
}
