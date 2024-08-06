'use server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { conn } from '../db'

export async function getUserDB() {
    try {
        const {getUser} = getKindeServerSession()
        const userKinde:any = await getUser();
        return userKinde
    } catch (error) {
      console.log(error);
    }
  }

  export async function getEmpresa() {
    try {
        const {getUser} = getKindeServerSession()
        const userKinde:any = await getUser();
        
        const query = `SELECT empresas.* FROM usuarios INNER JOIN empresas ON usuarios.idempresa = empresas.id WHERE usuarios.email = '${userKinde.email}' LIMIT 1`
        const res = await conn.query(query)
        const empresa = res.rows[0]
        return empresa
    } catch (error) {
      console.log(error);
    }
  }
