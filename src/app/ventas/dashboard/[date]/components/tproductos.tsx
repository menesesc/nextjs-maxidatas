import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

export function TProductos({tableData, rubros}:any) {

    const [ rubroSel, setRubroSel ] = useState('')

    const Cmb = ({datos}:any) => {
        try {     
            return (
            <Select onValueChange={(e) => {
                setRubroSel(e)
              }}>
                <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccione Rubro" />
                </SelectTrigger>
                <SelectContent>
                <SelectGroup>
                    { datos.map((dato: any, index: any) => (
                    <SelectItem key={index} value={dato.rubro}>{dato.rubro}</SelectItem>
                    ))}
                </SelectGroup>
                </SelectContent>
            </Select>
            )
        } catch (e) {
            // console.error(e)
        }
    }

    const Tabla = ({datos}:any) => {
        if (rubroSel != '') {
            datos = datos.filter((item: { rubro: string }) => item.rubro ===rubroSel)
        }
        try {
            return(
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Producto</TableHead>
                        <TableHead>Rubro</TableHead>
                        <TableHead>Cant</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        { datos.map((dato: any, index: any) => (
                            <TableRow key={index}>
                                <TableCell>{dato.producto}</TableCell>
                                <TableCell><Badge variant="secondary">{dato.rubro}</Badge></TableCell>
                                <TableCell>{dato.cantidad}</TableCell>
                                <TableCell className="text-right">{dato.importe}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )
        } catch (e) {
            // console.error(e)
        }
    }

    try {
      return (
        <div>
            <div>
                <Cmb datos={rubros} />
            </div>
            <div >
                <Tabla datos={tableData} />
            </div>
        </div>
      )
    } catch (e) {
      // console.error(e);
    }
  }