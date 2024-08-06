import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

  const Cmb = ({datos}:any) => {
    try {     
      return (
        <Select>
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

  export function CmbRubroProductos({tableData}:any) {
   
    try {
      return (
        <div >
          <Cmb datos = {tableData} />
        </div>
      )
    } catch (e) {
      // console.error(e);
    }
  }