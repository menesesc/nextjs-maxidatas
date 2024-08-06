import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { useAppContext } from "@/app/context"
import { useEffect, useState } from "react"
import { getTablaTopVendedores } from "@/lib/actions/ventas"

  const Lista = ({datos} : any) => {
    try {
      return(
        <div className="space-y-8">
          { datos.map((dato: any, index: any) => (
            <div key={index} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarFallback>{dato.avatar}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{dato.nombre}</p>
              </div>
              <div className="ml-auto font-medium">{dato.total}</div>
            </div>
          ))}
      </div>
    )} catch (e) {
      // console.error(e);
    }
  }

  export function TTopVendedores({tableData}:any) {
/*     const [ tableData, setTableData ] = useState()
    const { empresa, date }:any = useAppContext()
  
    useEffect(() => {
      const fetchData = async () => {
        const res = await getTablaTopVendedores(empresa.id, date)
        setTableData(res)
    }
    if (empresa != undefined) {fetchData()}
    }, [date, empresa, empresa.id]) */
    
    try {
      return (
        <div >
          <Lista datos = {tableData} />
        </div>
      )
    } catch (e) {
      // console.error(e);
    }
  }