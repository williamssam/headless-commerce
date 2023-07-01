type ButtonProps = {
	icon: React.ReactNode
	text: React.ReactNode
	type: 'button' | 'submit' | 'reset' | undefined
	onClick?: () => void
	className?: string
	variant: 'primary' | 'secondary'
}

export const Button = ({
	icon,
	text,
	type,
	onClick,
	className,
	variant,
}: ButtonProps) => {
	return (
		<button
			type={type ?? 'button'}
			onClick={onClick}
			className={`flex items-center justify-center gap-2 rounded-md px-6 text-[0.95rem] font-semibold transition-all ${
				variant === 'primary'
					? 'bg-neutral-900 py-3 text-neutral-100 hover:bg-neutral-800'
					: 'border-2 border-red-600 bg-transparent py-2.5 text-red-600 hover:bg-red-100'
			} ${className}`}
		>
			{icon}
			<span>{text}</span>
		</button>
	)
}
