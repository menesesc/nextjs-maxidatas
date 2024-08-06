"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"
import { useAppContext } from "@/app/context"
import { useEffect, useState } from "react"
import { getVentasEfectivoOtra, getVentasFormaPago } from "@/lib/actions/ventas"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function GFormasPago({chartData, efectivo, otra}: any) {
/*   const [ chartData, setChartData ] = useState()
  const [ efvo, setEfvo ]:any = useState()
  const { empresa, date }:any = useAppContext()

  useEffect(() => {
    const fetchData = async () => {
      const res = await getVentasFormaPago(empresa.id, date)
      const efvootra = await getVentasEfectivoOtra(empresa.id, date)
      if (efvootra.length > 0) {
        const total = efvootra[0].efectivo + efvootra[0].otra
        setEfvo((efvootra[0].efectivo * 100 / total).toFixed(2))
      }
      if (res.length > 0) {
        setChartData(res)
      }
  }
  if (empresa != undefined) {fetchData()}
  }, [date, empresa, empresa.id]) */

  try {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Formas Pago</CardTitle>
          <CardDescription>Total de Ventas por Forma de Pago</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="tipo"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="importe" fill="var(--color-desktop)" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex flex-row border-t p-4">
              <div className="flex w-full items-center gap-2">
                <div className="grid flex-1 auto-rows-min gap-0.5">
                  <div className="text-xs text-muted-foreground">Efectivo</div>
                  <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                    {efectivo}
                    <span className="text-sm font-normal text-muted-foreground">
                      %
                    </span>
                  </div>
                </div>
                <Separator orientation="vertical" className="mx-2 h-10 w-px" />
                <div className="grid flex-1 auto-rows-min gap-0.5">
                  <div className="text-xs text-muted-foreground">Otra</div>
                  <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                    {otra}
                    <span className="text-sm font-normal text-muted-foreground">
                      %
                    </span>
                  </div>
                </div>
              </div>
            </CardFooter>
      </Card>
    )
  } catch (err) {
    // console.error(err)
  }
  }
