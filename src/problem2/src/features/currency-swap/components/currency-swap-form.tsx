import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card"
import { useEffect, useState } from "react"
import { CurrencyCombobox } from "./currency-combobox"
import { currencyData } from "../data/currency"
import { ArrowUpDown, Loader2 } from "lucide-react"
import { ShineBorder } from "@/components/magic-ui/shine-border"

// Zod schema for form validation
const schema = z.object({
	fromCurrency: z.object({
		currency: z.string().min(1, "Please select a currency"),
		price: z.number().positive("Price must be greater than 0"),
	}),
	toCurrency: z.object({
		currency: z.string().min(1, "Please select a currency"),
		price: z.number().positive("Price must be greater than 0"),
	}),
	amountToSend: z.number().positive("Amount must be greater than 0"),
	amountToReceive: z.number(),
})

type FormValues = z.infer<typeof schema>

export default function CurrencySwapForm() {
	const {
		control,
		handleSubmit,
		register,
		formState: { errors },
		watch,
		setValue,
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			fromCurrency: currencyData[0],
			toCurrency: currencyData[1],
			amountToSend: 0,
			amountToReceive: 0,
		},
	})

	const [isSubmitting, setIsSubmitting] = useState(false)

	const fromCurrency = watch("fromCurrency")
	const toCurrency = watch("toCurrency")
	const amountToSend = watch("amountToSend")

	// Calculate the amount to receive whenever fromCurrency, toCurrency, or amountToSend changes
	useEffect(() => {
		if (fromCurrency && toCurrency && amountToSend > 0) {
			const exchangeRate = fromCurrency.price / toCurrency.price
			const amountToReceive = amountToSend * exchangeRate
			setValue("amountToReceive", amountToReceive)
		}
	}, [fromCurrency, toCurrency, amountToSend, setValue])

	const onSubmit = async (data: FormValues) => {
		setIsSubmitting(true)
		setTimeout(() => {
			setIsSubmitting(false) // Reset loading state after timeout
			toast.success("Swap successfully!", {
				description: `Amount to receive: ${data.amountToReceive}`,
			})
		}, 1000)
	}

	const handleSwap = () => {
		if (!fromCurrency || !toCurrency) return
		setValue("fromCurrency", toCurrency)
		setValue("toCurrency", fromCurrency)
	}

	return (
		<Card className="mx-auto mt-10 max-w-md border-none">
			<ShineBorder
				className="relative w-full rounded-lg text-left"
				color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
			>
				<CardHeader>
					<CardTitle>Currency Swap</CardTitle>
					<CardDescription>
						Swap assets from one currency to another.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="relative mb-6 space-y-6">
							<div className="flex space-x-2">
								<div className="w-28">
									<Label htmlFor="fromCurrency">From currency</Label>
									<Controller
										name="fromCurrency"
										control={control}
										render={({ field }) => (
											<CurrencyCombobox
												data={currencyData}
												value={field.value}
												onChange={field.onChange}
												placeholder="Select currency"
											/>
										)}
									/>
									{errors.fromCurrency && (
										<p className="text-sm text-red-500">
											{errors.fromCurrency.message}
										</p>
									)}
								</div>
								<div className="flex-1">
									<Label htmlFor="amountToSend">Amount to Send</Label>
									<Input
										type="number"
										id="amountToSend"
										{...register("amountToSend", { valueAsNumber: true })}
										placeholder="Enter amount"
									/>
									{errors.amountToSend && (
										<p className="text-sm text-red-500">
											{errors.amountToSend.message}
										</p>
									)}
								</div>
							</div>

							<div className="absolute -left-6 top-[35%] -translate-x-1/2 -translate-y-1/2">
								<Button
									size="icon"
									variant="outline"
									className="rounded-full"
									onClick={handleSwap}
								>
									<ArrowUpDown className="size-4" />
								</Button>
							</div>

							<div className="flex space-x-2">
								<div className="w-28">
									<Label htmlFor="toCurrency">To currency</Label>
									<Controller
										name="toCurrency"
										control={control}
										render={({ field }) => (
											<CurrencyCombobox
												data={currencyData}
												value={field.value}
												onChange={field.onChange}
												placeholder="Select currency"
											/>
										)}
									/>
									{errors.toCurrency && (
										<p className="text-red-500">{errors.toCurrency.message}</p>
									)}
								</div>
								<div className="flex-1">
									<Label htmlFor="amountToReceive">Amount to Receive</Label>
									<Input
										type="number"
										id="amountToReceive"
										{...register("amountToReceive", { valueAsNumber: true })}
										placeholder="Calculated amount"
										readOnly
									/>
								</div>
							</div>
						</div>
						<Button type="submit" className="w-full" disabled={isSubmitting}>
							{isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
							Swap
						</Button>
					</form>
				</CardContent>
			</ShineBorder>
		</Card>
	)
}
