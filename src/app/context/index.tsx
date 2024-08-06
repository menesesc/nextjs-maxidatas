'use client';

import React from "react";
import { createContext, useState, useContext } from "react";
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

const AppContext = createContext({})

export function AppWrapper({children }: {
    children: React.ReactNode;
  }) {
    let [user, setUser] = useState('')
    let [empresa, setEmpresa] = useState('')
    let [date, setDate] =  useState('')
    let [fecha, setFecha] = React.useState<DateRange | undefined>({
      from: addDays(new Date(), -7),
      to: addDays(new Date(), -1),
    })


    return (
        <AppContext.Provider value={{
            user, setUser,
            empresa, setEmpresa,
            date, setDate,
            fecha, setFecha
          }}>
            {children}
        </AppContext.Provider>
    )
  }

  export function useAppContext() {
    return useContext(AppContext)
  }