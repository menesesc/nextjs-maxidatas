"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts"

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
import { getVentasEfectivoOtra, getVentasElectronicaOtra, getVentasFacturacion, getVentasFormaPago } from "@/lib/actions/ventas"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  label: {
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function GFacturacion({chartData, electronica, otra}: any) {
  // const [ chartData, setChartData ] = useState()
/*   const [ electronica, setElectronica ]:any = useState()
  const [ otra, setOtra ]:any = useState()
  const { empresa, date }:any = useAppContext()

  useEffect(() => {
    const fetchData = async () => {
      //const res = await getVentasFacturacion(empresa.id, date)
      const elecotra = await getVentasElectronicaOtra(empresa.id, date)
      setElectronica(elecotra[0].pelectronica)
      setOtra(elecotra[0].potra)
    }
    if (empresa != undefined) {fetchData()}
  }, [date, empresa, empresa.id])
 */
  return (
    <Card>
      <CardHeader>
        <CardTitle>Facturacion</CardTitle>
        <CardDescription>Total de Ventas por Tipo de Factura</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
          >
            <XAxis type="number" dataKey="$" hide />
            <YAxis type="category" dataKey="tipo" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="$" fill="var(--color-desktop)" radius={5}>
                <LabelList
                    dataKey="tipo"
                    position="insideLeft"
                    offset={8}
                    className="fill-[--color-label]"
                    fontSize={12}
                />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      
      <CardFooter className="flex flex-row border-t p-4">
            <div className="flex w-full items-center gap-2">
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">Electronica</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  {electronica}
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
}
