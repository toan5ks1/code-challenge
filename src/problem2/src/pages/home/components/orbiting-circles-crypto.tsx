import { currencyData } from "@/features/currency-swap/data/currency"
import { OrbitingCircles } from "./orbiting-circles"

export function OrbitingCirclesCrypto() {
	return (
		<div className="relative flex size-full flex-col items-center justify-center overflow-hidden">
			<OrbitingCircles iconSize={30} radius={680} reverse speed={0.5}>
				{currencyData.slice(0, 6).map((icon, index) => (
					<img
						key={`round-1-${index}`}
						src={`/tokens/${icon.currency}.svg`}
						alt={icon.currency}
						width={40}
						height={40}
						className="opacity-80"
					/>
				))}
			</OrbitingCircles>
			<OrbitingCircles iconSize={40} radius={540} speed={0.75}>
				{currencyData.slice(0, 5).map((icon, index) => (
					<img
						key={`round-2-${index}`}
						src={`/tokens/${icon.currency}.svg`}
						alt={icon.currency}
						width={40}
						height={40}
						className="opacity-100"
					/>
				))}
			</OrbitingCircles>
			<OrbitingCircles iconSize={30} radius={420} reverse speed={0.5}>
				{currencyData.slice(0, 4).map((icon, index) => (
					<img
						key={`round-3-${index}`}
						src={`/tokens/${icon.currency}.svg`}
						alt={icon.currency}
						width={40}
						height={40}
						className="opacity-60"
					/>
				))}
			</OrbitingCircles>
		</div>
	)
}
