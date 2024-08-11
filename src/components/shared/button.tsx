import React from "react"
import { Button } from "antd"

export default function ButtonComponent(AppProps:any){
    return (
       <Button type={AppProps.type} onClick={AppProps.pass}>{AppProps.name}</Button>
    )
}