import { Card, lighten } from "@mui/material"
import { useEffect, useState } from "react"


export const PaymentWidget = () => {


    const [list, setList] = useState([])

    useEffect(()=> {

        fetch(`${process.env.NEXT_PUBLIC_HOST}/payment`)
        .then(res => res.json())
        .then(json => {
          console.log(json)

            let filtered = json?.rows?.filter(payment => {
                if (payment?.contragent_id || payment?.deal_id || payment?.object_id) {
                    return false
                } else {
                    return true
                }
            })


          setList(filtered)
        })
    
    
      }, [])



  return (
    <Card sx={{ p: 3, color: 'white', background: list?.length == 0 ? 'linear-gradient(90deg, #0d0, #5a9)' : 'linear-gradient(90deg, #f00, #e55)' }}>
      <h3>Непривязанные платежи</h3>
      <p ><span style={{fontSize: 42, display: 'block'}}>{list?.length} шт.</span></p>
    </Card>
  )
}
