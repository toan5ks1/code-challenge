import { currencyData } from "@/features/currency-swap/data/currency"
import { OrbitingCircles } from "../../../components/magic-ui/orbiting-circles"

export function OrbitingCirclesCrypto() {
	return (
		<div className="relative flex size-full flex-col items-center justify-center overflow-hidden">
			{/* <OrbitingCircles iconSize={30} radius={680} reverse speed={0.5}>
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
			</OrbitingCircles> */}
			{/* <OrbitingCircles iconSize={40} radius={480} speed={0.75}>
				{currencyData.slice(0, 8).map((icon, index) => (
					<img
						key={`round-2-${index}`}
						src={`/tokens/${icon.currency}.svg`}
						alt={icon.currency}
						width={40}
						height={40}
					/>
				))}
			</OrbitingCircles> */}
			<OrbitingCircles iconSize={30} radius={360} reverse speed={0.25}>
				{currencyData.slice(0, 7).map((icon, index) => (
					<img
						key={`round-3-${index}`}
						src={`/tokens/${icon.currency}.svg`}
						alt={icon.currency}
						width={40}
						height={40}
					/>
				))}
			</OrbitingCircles>
		</div>
	)
}
