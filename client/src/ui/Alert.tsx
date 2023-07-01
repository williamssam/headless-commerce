import { Siren } from '@phosphor-icons/react'
import React from 'react'

type AlertProps = {
	variant: 'info' | 'warning' | 'success' | 'danger'
	text: React.ReactNode
	className?: string
	hasIcon?: boolean
}

const styles: Record<AlertProps['variant'], string> = {
	info: 'border-b-blue-600 bg-blue-100 text-blue-600',
	warning: 'border-b-orange-600 bg-orange-100 text-orange-600',
	danger: 'border-b-red-600 bg-red-100 text-red-600',
	success: 'border-b-green-600 bg-green-100 text-green-600',
}

export const Alert = ({ text, variant, className, hasIcon }: AlertProps) => {
	return (
		<div
			role='alert'
			className={`flex items-center gap-2 rounded-md border-b-2 px-4 py-3 text-xs font-medium ${styles[variant]} ${className}`}
		>
			{hasIcon ? <Siren size={16} weight='fill' /> : null}
			<p>{text}</p>
		</div>
	)
}
