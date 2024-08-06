"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

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
import { getVentasProductos } from "@/lib/actions/ventas"
import { useAppContext } from "@/app/context"
import { useEffect, useState } from "react"

const chartConfig = {
  desktop: {
    label: "$ ",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function GProductos({chartData}: any) {
  /* const [ chartData, setChartData ] = useState()
  const { empresa, date }:any = useAppContext()

  useEffect(() => {
    const fetchData = async () => {
      const res = await getVentasProductos(empresa.id, date)
      if (res.length > 0) {
        setChartData(res)
      }
  }
  if (empresa != undefined) {fetchData()}
  }, [date, empresa, empresa.id]) */
  
  try{
    return (
      <Card>
        <CardHeader>
          <CardTitle>Productos</CardTitle>
          <CardDescription>
            Total de Ventas por Rubro e Importe
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <RadarChart data={chartData}>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <PolarAngleAxis dataKey="rubro" />
              <PolarGrid />
              <Radar
                dataKey="$"
                fill="var(--color-desktop)"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    )
  } catch (e) {
    //console.error(e);
  }
}
