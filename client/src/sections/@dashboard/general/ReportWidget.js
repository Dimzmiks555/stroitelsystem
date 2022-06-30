import { Card, lighten } from "@mui/material"
import { useEffect, useState } from "react"


export const ReportWidget = () => {


    const [note, setNote] = useState([])
    const [checkouts, setCheckouts] = useState([])

    useEffect(()=> {

        fetch(`${process.env.NEXT_PUBLIC_HOST}/notes`)
        .then(res => res.json())
        .then(json => {
          console.log(json)

            let filtered = json?.filter(payment => {
                if (payment?.isChecked) {
                    return false
                } else {
                    return true
                }
            })


          setNote(filtered)
        })

        fetch(`${process.env.NEXT_PUBLIC_HOST}/checkouts`)
        .then(res => res.json())
        .then(json => {
          console.log(json)

            let filtered = json?.filter(payment => {
                if (payment?.isChecked) {
                    return false
                } else {
                    return true
                }
            })


            setCheckouts(filtered)
        })
    
    
      }, [])



  return (
    <Card sx={{ p: 3, color: 'white', background: note?.length == 0 ? 'linear-gradient(90deg, #0d0, #5a9)' : 'linear-gradient(90deg, #f50, #ea5)' }}>
      <h3>Учёт</h3>
      <p style={{display: 'block'}}>Непроверенные записи<span style={{fontSize: 24}}> {note?.length} шт.</span></p>
      <p style={{display: 'block'}}>Непроверенные реализации<span style={{fontSize: 24}}> {checkouts?.length} шт.</span></p>
    </Card>
  )
}
