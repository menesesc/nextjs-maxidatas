"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Rectangle, XAxis, YAxis } from "recharts"

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
import { useAppContext } from "@/app/context"
import { useEffect, useState } from "react"
import { getVentasCubiertos } from "@/lib/actions/ventas"

const chartConfig = {
  mediodia: {
    label: "almuerzo",
    color: "hsl(var(--chart-1))",
  },
  noche: {
    label: "cena",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function GCubiertos({chartData}: any) {
/*   const [ chartData, setChartData ] = useState()
  const { empresa, date }:any = useAppContext()

  useEffect(() => {
    const fetchData = async () => {
      const res = await getVentasCubiertos(empresa.id, date)
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
          <CardTitle>Cubiertos</CardTitle>
          <CardDescription>
            Totales por turnos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="fecha"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                //tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey="cena"
                type="natural"
                fill="var(--color-noche)"
                fillOpacity={0.4}
                stroke="var(--color-noche)"
                stackId="a"
              />
              <Area
                dataKey="almuerzo"
                type="natural"
                fill="var(--color-mediodia)"
                fillOpacity={0.4}
                stroke="var(--color-mediodia)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        
      </Card>
    )
  } catch (err) {
    // console.error(err)
  }
}
