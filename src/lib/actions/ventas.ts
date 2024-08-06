'use server'
import { conn } from '../db'

export async function getVentasTotales(idempresa:any, fecha:any) {
  try {
    if (idempresa != undefined) {
      const query = `SELECT 
              sum(importe) as total
          FROM reportes 
          INNER JOIN facturaciones ON facturaciones.idreporte = reportes.id
          WHERE idempresa = ${idempresa} AND fecha BETWEEN '${fecha.split('-')[0]}' AND '${fecha.split('-')[1]}'`
      // console.log(query)
      const res = await conn.query(query)
      return res.rows[0].total
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getPromedioConsumo(idempresa:any, fecha:any) {
  try {
    if (idempresa != undefined) {
      const query = `SELECT
            (total / cubiertos) as promedio
          (SELECT 
              sum(importe) as total
              sum(cant) as cubiertos
          FROM reportes 
          INNER JOIN facturaciones ON facturaciones.idreporte = reportes.id
          INNER JOIN cubiertos ON cubiertos.idreporte = reportes.id
          WHERE idempresa = ${idempresa} AND fecha BETWEEN '${fecha.split('-')[0]}' AND '${fecha.split('-')[1]}')`
      console.log(query)
      const res = await conn.query(query)
      return res.rows[0].total
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getCubiertosTotales(idempresa:any, fecha:any) {
  try {
    if (idempresa != undefined) {
      const query = `SELECT 
              sum(cant) as total
          FROM reportes 
          INNER JOIN cubiertos ON cubiertos.idreporte = reportes.id
          WHERE idempresa = ${idempresa} AND fecha BETWEEN '${fecha.split('-')[0]}' AND '${fecha.split('-')[1]}'`
      // console.log(query)
      const res = await conn.query(query)
      return res.rows[0].total
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getVentasTotalesSuma(idempresa:any, fecha:any) {
    try {
      if (idempresa != undefined) {
        const query = `SELECT
                        to_char(fecha, 'dd/mm') as fecha, almuerzo, cena FROM
            (SELECT 
                fecha, 
                sum(importe) filter (where turno = 'Almuerzo')::numeric::int as almuerzo, 
                sum(importe) filter (where turno = 'Cena')::numeric::int as cena 
            FROM reportes 
            INNER JOIN facturaciones ON facturaciones.idreporte = reportes.id
            WHERE idempresa = ${idempresa} AND fecha BETWEEN '${fecha.split('-')[0]}' AND '${fecha.split('-')[1]}'
            GROUP BY reportes.fecha
            ORDER BY fecha)`
        // console.log(query)
        const res = await conn.query(query)
        return res.rows
      }
    } catch (error) {
      console.log(error);
    }
  }

  export async function getVentasCubiertos(idempresa:any, fecha:any) {
    try {
      if (idempresa != undefined) {
        const query = `SELECT
                        to_char(fecha, 'dd/mm') as fecha, almuerzo, cena FROM
            (SELECT 
                fecha, 
                sum(cant) filter (where turno = 'Almuerzo') as almuerzo, 
                sum(cant) filter (where turno = 'Cena') as cena 
            FROM reportes 
            INNER JOIN cubiertos ON cubiertos.idreporte = reportes.id
            WHERE idempresa = ${idempresa} AND fecha BETWEEN '${fecha.split('-')[0]}' AND '${fecha.split('-')[1]}'
            GROUP BY reportes.fecha
            ORDER BY fecha)`
        // console.log(query)
        const res = await conn.query(query)
        return res.rows
      }
    } catch (error) {
      console.log(error);
    }
  }

  export async function getVentasFormaPago(idempresa:any, fecha:any) {
    try {
        if (idempresa != undefined) {
          const query = `SELECT * FROM
              (SELECT 
                  tipo,
                  sum(importe)::numeric::int as importe
              FROM reportes
              INNER JOIN formaspago ON formaspago.idreporte = reportes.id
              WHERE idempresa = ${idempresa} AND fecha BETWEEN '${fecha.split('-')[0]}' AND '${fecha.split('-')[1]}'
              GROUP BY formaspago.tipo)
              ORDER BY importe DESC`
          // console.log(query)
          const res = await conn.query(query)
          return res.rows
        }
    } catch (error) {
      console.log(error);
    }
  }

  export async function getVentasEfectivoOtra(idempresa:any, fecha:any){
    try {
      if (idempresa != undefined) {
        const query = `SELECT 
                efectivo,
                round(efectivo * 100 / (efectivo + otra),2) AS pefectivo,
                otra,
                round(otra * 100 / (efectivo + otra),2) AS potra
            FROM
            (SELECT 
                sum(importe)::numeric as efectivo 
            FROM reportes 
            INNER JOIN formaspago ON formaspago.idreporte = reportes.id
            WHERE idempresa = ${idempresa} AND fecha BETWEEN '${fecha.split('-')[0]}' AND '${fecha.split('-')[1]}'
            AND tipo LIKE '%Efectivo%') as efectivo,
            (SELECT 
                sum(importe)::numeric as otra 
            FROM reportes 
            INNER JOIN formaspago ON formaspago.idreporte = reportes.id
            WHERE idempresa = ${idempresa} AND fecha BETWEEN '${fecha.split('-')[0]}' AND '${fecha.split('-')[1]}'
            AND tipo NOT LIKE '%Efectivo%') as otra`
        const res = await conn.query(query)
        return res.rows[0]
      }
    } catch (error) {
      console.log(error);
    }
  }


  export async function getVentasFacturacion(idempresa:any, fecha:any) {
    try {
      if (idempresa != undefined) {
        const query = `SELECT 
                tipo,
                sum(importe)::numeric::int as "$"
            FROM reportes 
            INNER JOIN facturaciones ON facturaciones.idreporte = reportes.id
            WHERE idempresa = ${idempresa} AND fecha BETWEEN '${fecha.split('-')[0]}' AND '${fecha.split('-')[1]}'
            GROUP BY facturaciones.tipo`
        // console.log(query)
        const res = await conn.query(query)
        return res.rows
      }
    } catch (error) {
      console.log(error);
    }
  }

  export async function getVentasElectronicaOtra(idempresa:any, fecha:any){
    try {
      if (idempresa != undefined) {
        const query = `SELECT 
                electronica,
                round(electronica * 100 / (electronica + otra),2) AS pelectronica,
                otra,
                round(otra * 100 / (electronica + otra),2) AS potra
            FROM
            (SELECT 
                sum(importe)::numeric as electronica 
            FROM reportes 
            INNER JOIN facturaciones ON facturaciones.idreporte = reportes.id
            WHERE idempresa = ${idempresa} AND fecha BETWEEN '${fecha.split('-')[0]}' AND '${fecha.split('-')[1]}'
            AND tipo LIKE '%ELECTR%') as electronica,
            (SELECT 
                sum(importe)::numeric as otra 
            FROM reportes 
            INNER JOIN facturaciones ON facturaciones.idreporte = reportes.id
            WHERE idempresa = ${idempresa} AND fecha BETWEEN '${fecha.split('-')[0]}' AND '${fecha.split('-')[1]}'
            AND tipo NOT LIKE '%ELECTR%') as otra`
        const res = await conn.query(query)
        return res.rows[0]
      }
    } catch (error) {
      console.log(error);
    }
  }

  export async function getVentasProductos(idempresa:any, fecha:any) {
    try {
      if (idempresa != undefined) {
        const query = `SELECT 
            rubro,
            sum(importe)::numeric::int as "$"
        FROM reportes 
        INNER JOIN productos ON productos.idreporte = reportes.id
        WHERE idempresa = ${idempresa} AND fecha BETWEEN '${fecha.split('-')[0]}' AND '${fecha.split('-')[1]}'
        GROUP BY productos.rubro
        ORDER BY sum(importe) DESC
        LIMIT 5`
        // console.log(query)
        const res = await conn.query(query)
        return res.rows
      }
    } catch (error) {
      console.log(error);
    }
  }

  export async function getTablaTopVendedores(idempresa:any, fecha:any) {
    try {
      if (idempresa != undefined) {
        const query = `SELECT 
            LEFT(empleado,2) as avatar,
            empleado as nombre,
            sum(importe) as total
        FROM reportes 
        INNER JOIN empleados ON empleados.idreporte = reportes.id
        WHERE idempresa = ${idempresa} AND fecha BETWEEN '${fecha.split('-')[0]}' AND '${fecha.split('-')[1]}'
        GROUP BY empleados.empleado
        ORDER BY total DESC
        LIMIT 5`
        // console.log(query)
        const res = await conn.query(query)
        return res.rows
      }
    } catch (error) {
      console.log(error);
    }
  }

  export async function getTablaProductos(idempresa:any, fecha:any) {
    try {
      if (idempresa != undefined) {
        const query = `SELECT 
            rubro,
            producto, 
            sum(cant) as cantidad,
            sum(importe) as importe
        FROM reportes 
        INNER JOIN productos ON productos.idreporte = reportes.id
        WHERE idempresa = ${idempresa} AND fecha BETWEEN '${fecha.split('-')[0]}' AND '${fecha.split('-')[1]}'
        GROUP BY producto, rubro
        ORDER BY cantidad DESC`
        // console.log(query)
        const res = await conn.query(query)
        return res.rows
      }
    } catch (error) {
      console.log(error);
    }
  }

  export async function getTablaRubrosProductos(idempresa:any, fecha:any) {
    try {
      if (idempresa != undefined) {
        const query = `SELECT DISTINCT
            rubro
        FROM reportes 
        INNER JOIN productos ON productos.idreporte = reportes.id
        WHERE idempresa = ${idempresa} AND fecha BETWEEN '${fecha.split('-')[0]}' AND '${fecha.split('-')[1]}'
        ORDER BY rubro`
        //console.log(query)
        const res = await conn.query(query)
        return res.rows
      }
    } catch (error) {
      console.log(error);
    }
  }