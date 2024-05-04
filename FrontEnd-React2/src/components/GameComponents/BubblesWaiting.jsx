import { useEffect, useState } from "react"
import { bubblesData } from "../Common/BubblesData"

export function BubblesWaiting () {

    const [bubblesWaiting, setBubblesWaiting]= useState([])

    useEffect(()=>{
        if(!bubblesWaiting){

        }
    },[])

  return (
    <div>BW</div>
  )
}
