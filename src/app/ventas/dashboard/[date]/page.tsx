import { getKindeServerSession, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { getEmpresa } from "@/lib/actions/user"
import { Dashboard } from "./components/dashboard";
import { redirect } from "next/navigation";

export default async function Home() {
    const { isAuthenticated, getUser} = getKindeServerSession();

    const user = await getUser();
    const empresa = await getEmpresa()
    const autenticado = await isAuthenticated()

    if (autenticado && empresa !== undefined) {
        return (
            <>
                <Dashboard user={user} empresa={empresa} />
            </>
        )
    } else if (empresa === undefined) {
        return (
            <div>
                <p>Usuario no habilitado. Hable con el administrador de su empresa</p>
                <LogoutLink>Cerrar Sesion</LogoutLink>
            </div>
        )
    } else {
        redirect('/')
    }
}