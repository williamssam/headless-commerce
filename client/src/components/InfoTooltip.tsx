import { Question } from '@phosphor-icons/react'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../ui/Tooltip'

type InfoTooltipProps = {
	text: string
	className?: string
}

export const InfoTooltip = ({ text, className }: InfoTooltipProps) => {
	return (
		<TooltipProvider delayDuration={200}>
			<Tooltip>
				<TooltipTrigger asChild>
					<button
						type='button'
						className={`flex items-center gap-[2px] rounded-md bg-neutral-200 px-2 py-1 text-[0.65rem] font-medium uppercase tracking-wide ${className}`}
					>
						<span>What is this</span>
						<Question size={16} weight='fill' />
					</button>
				</TooltipTrigger>
				<TooltipContent className='w-60'>{text}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
