"use client"

import { Bar, BarChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { getVentasTotalesSuma } from "@/lib/actions/ventas"
import { useAppContext } from "@/app/context"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function GVentas({chartData}: any) {
  //const [ error, setError ] = useState()
  // const [ chartData, setChartData ] = useState()
  //const { empresa, date }:any = useAppContext()

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await getVentasTotalesSuma(empresa.id, date)
  //     if (res.length > 0) {
  //       setChartData(res)
  //     }
  // }
  // if (empresa != undefined) {fetchData()}
  // }, [date, empresa, empresa.id])


  try {
    return (
      <ResponsiveContainer width="100%" height={350}>
        <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="fecha"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                // tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={0}
                tickCount={6}
              />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Bar
                dataKey="almuerzo"
                stackId="a"
                fill="var(--color-desktop)"
                radius={[0, 0, 4, 4]}
              />
              <Bar
                dataKey="cena"
                stackId="a"
                fill="var(--color-mobile)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
      </ResponsiveContainer>
    )
  } catch (err) {
    //console.error(err)
  }
}