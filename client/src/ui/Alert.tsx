import { Siren } from '@phosphor-icons/react'
import type { PropsWithChildren } from 'react'

interface AlertProps extends PropsWithChildren {
	variant: 'info' | 'warning' | 'success' | 'danger'
	className?: string
}

const styles: Record<AlertProps['variant'], string> = {
	info: 'border-b-blue-600 bg-blue-100 text-blue-600',
	warning: 'border-b-orange-600 bg-orange-100 text-orange-600',
	danger: 'border-b-red-600 bg-red-100 text-red-600',
	success: 'border-b-green-600 bg-green-100 text-green-600',
}

export const Alert = ({ children, variant, className }: AlertProps) => {
	return (
		<div
			role='alert'
			className={`relative rounded-md border-b-2 px-4 py-3 text-xs font-medium ${styles[variant]} ${className}`}
		>
			{/* {hasIcon ?  : null} */}
			<Siren
				size={32}
				weight='fill'
				className='absolute bottom-0 right-1 opacity-20'
			/>
			{children}
		</div>
	)
}
