'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { MainNav } from "./main-nav";
import { Search } from "./search";
import { UserNav } from "./user-nav";
import { CalendarDateRangePicker } from "./date-range-picker";
import { GVentas } from "./gventas";
import { TTopVendedores } from "./ttopvendedores";
import { GCubiertos } from "./gcubiertos";
import { GFormasPago } from "./gformaspago";
import { GFacturacion } from "./gfacturacion";
import { GProductos } from "./gproductos";
import { getTablaTopVendedores, getVentasCubiertos, getVentasEfectivoOtra, getVentasElectronicaOtra, getVentasFacturacion, getVentasFormaPago, getVentasProductos, getVentasTotalesSuma, getVentasTotales, getCubiertosTotales, getPromedioConsumo, getTablaProductos, getTablaRubrosProductos } from "@/lib/actions/ventas";
import { useAppContext } from "@/app/context";
import { useParams } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { TProductos } from "./tproductos";
import { CmbRubroProductos } from "./cmbrubrosproductos";

export function Dashboard({
    user,
    empresa,

  }: {
    user: KindeUser | null;
    empresa: any
  }) {
    const params = useParams()
    const date = params.date
    const { fecha }:any = useAppContext()
    const [ isLoading, setIsLoading ] = useState(false)
    const [ infoVentasTotales, setInfoVentasTotales ] = useState(0)
    const [ infoCubiertosTotales, setInfoCubiertosTotales ] = useState(0)
    const [ infoConsumoPromedio, setInfoConsumoPromedio ] = useState(0)
    const [ chartDataGVentas, setChartDataGVentas ] = useState()
    const [ chartDataGProductos, setChartDataGProductos ] = useState()
    const [ chartDataGFacturacion, setChartDataGFacturacion ] = useState()
    const [ chartDataGCubiertos, setChartDataGCubiertos ] = useState()
    const [ percentFacElectronica, setPercentFacElectronica ] = useState()
    const [ percentFacOtra, setPercentFacOtra ] = useState()
    const [ chartDataGFormasPago, setChartDataGFormasPago ] = useState()
    const [ percentFPEfectivo, setPercentFPEfectivo ] = useState()
    const [ percentFPOtra, setPercentFPOtra ] = useState()
    const [ tableDataTopVendedores, setTableDataTopVendedores] = useState()
    const [ tableDataProductos, setTableDataProductos] = useState()
    const [ rubrosProductos, setRubrosProductos] = useState()
    const [ link, setLink] = useState('')
    useEffect(() => {       
        setLink(`/ventas/dashboard/${formatDate(fecha.from)}-${formatDate(fecha.to)}`)

        const fetchDataVentasTotales = async () => {
            const res = await getVentasTotales(empresa.id, date)
            setInfoVentasTotales(res)
        }

        const fetchDataCubiertosTotales = async () => {
            const res = await getCubiertosTotales(empresa.id, date)
            setInfoCubiertosTotales(res)
        }

        const fetchDataConsumoPromedio = async () => {
            //const res = await getPromedioConsumo(empresa.id, date)
            const res = infoVentasTotales / infoCubiertosTotales
            setInfoConsumoPromedio(res)
        }

        const fetchDataGVentas = async () => {
          const res = await getVentasTotalesSuma(empresa.id, date)
          setChartDataGVentas(res)
        } 
    
        const fetchDataGProductos = async () => {
          const res = await getVentasProductos(empresa.id, date)
          setChartDataGProductos(res)
        }
    
        const fetchDataGFacturacion = async () => {
          const res = await getVentasFacturacion(empresa.id, date)
          const elecotra = await getVentasElectronicaOtra(empresa.id, date)
          setChartDataGFacturacion(res)
          setPercentFacElectronica(elecotra.pelectronica)
          setPercentFacOtra(elecotra.potra)
        }
    
        const fetchDataGCubiertos = async () => {
          const res = await getVentasCubiertos(empresa.id, date)
          setChartDataGCubiertos(res)
        }
    
        const fetchDataGFormasPago = async () => {
          const res = await getVentasFormaPago(empresa.id, date)
          setChartDataGFormasPago(res)
          const efvootra = await getVentasEfectivoOtra(empresa.id, date)
          setPercentFPEfectivo(efvootra.pefectivo)
          setPercentFPOtra(efvootra.potra)
        }
    
        const fetchDataTTopVendedores = async () => {
          const res = await getTablaTopVendedores(empresa.id, date)
          setTableDataTopVendedores(res)
        }

        const fetchDataTProductos = async () => {
            const res = await getTablaProductos(empresa.id, date)
            setTableDataProductos(res)
        }

        const fetchDataTRubroProductos = async () => {
            const rubros = await getTablaRubrosProductos(empresa.id, date)
            setRubrosProductos(rubros)
        }
  
      setIsLoading(true)
      fetchDataVentasTotales()
      fetchDataCubiertosTotales()
      fetchDataConsumoPromedio()
      fetchDataGVentas()
      fetchDataGProductos()
      fetchDataGFacturacion()
      fetchDataGCubiertos()
      fetchDataGFormasPago()
      fetchDataTTopVendedores()
      fetchDataTProductos()
      fetchDataTRubroProductos()
      setIsLoading(false)
      }, [date, empresa.id, fecha.from, fecha.to, infoCubiertosTotales, infoVentasTotales, user])

    if (isLoading == true) {
        return (
            <p>Loading...</p>
        )
    } else {
        return (
            <>
            <div className="flex-col md:flex">
                <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <MainNav className="mx-6" />
                    <div className="ml-auto flex items-center space-x-4">
                    {/* <Search /> */}
                    <UserNav user={user} empresa={empresa}/>
                    </div>
                </div>
                </div>
                <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    <div className="flex items-center space-x-2">
                    <CalendarDateRangePicker />
                    <Button asChild>
                        <Link href={link}>Ir</Link>
                    </Button>
                    </div>

                </div>
                <Tabs defaultValue="overview" className="space-y-4">
                    {/* <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics" disabled>
                        Analytics
                    </TabsTrigger>
                    <TabsTrigger value="reports" disabled>
                        Reports
                    </TabsTrigger>
                    <TabsTrigger value="notifications" disabled>
                        Notifications
                    </TabsTrigger>
                    </TabsList> */}
                    <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                            Ventas Totales
                            </CardTitle>
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                            >
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{infoVentasTotales}</div>
                        </CardContent>
                        </Card>
                        <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                            Cubiertos
                            </CardTitle>
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                            >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{infoCubiertosTotales}</div>
                        </CardContent>
                        </Card>
                        <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Promedio Consumo</CardTitle>
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                            >
                            <rect width="20" height="14" x="2" y="5" rx="2" />
                            <path d="M2 10h20" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{infoConsumoPromedio}</div>
                        </CardContent>
                        </Card>          
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Ventas Totales</CardTitle>
                            <CardDescription>Total de Ventas por Turno</CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <GVentas chartData={chartDataGVentas}/>
                        </CardContent>
                        </Card>
                        <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Top 5 Vendedores</CardTitle>
                            <CardDescription>
                            Totales de ventas realizadas
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <TTopVendedores tableData={tableDataTopVendedores} />
                        </CardContent>
                        </Card>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
                        <div className="col-span-2">
                            <GCubiertos chartData={chartDataGCubiertos} />
                        </div>
                        <div className="col-span-2">
                            <GFormasPago chartData={chartDataGFormasPago} efectivo={percentFPEfectivo} otra={percentFPOtra}/>
                        </div>
                        <div className="col-span-2">
                        <GFacturacion chartData={chartDataGFacturacion} electronica={percentFacElectronica} otra={percentFacOtra} />
                        </div>
                        <div className="col-span-2">
                        <GProductos chartData={chartDataGProductos} />
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
                        <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Ranking de Productos</CardTitle>
                            <CardDescription>
                            Totales de productos vendidos
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <TProductos tableData={tableDataProductos} rubros={rubrosProductos} />
                        </CardContent>
                        </Card>
                    </div>
                    </TabsContent>
                </Tabs>
                </div>
            </div>
            </>
        )    
    }

  }