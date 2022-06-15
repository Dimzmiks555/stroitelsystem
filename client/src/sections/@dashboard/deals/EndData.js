import { Accordion, Box, Card, Chip, Stack, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { RHFTextField, RHFUploadMultiFile } from "src/components/hook-form";
import {useRouter} from 'next/router'
import { PlanPremiumIcon } from "src/assets";

import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import PaymentBlock from "./paymentBlock/paymentBlock";

export default function EndData({setValue, currentUser, values, contragents}) {

    
    const { push, query, reload } = useRouter();

    const onSubmitFile = () => {

        console.log(values?.images)
        
        // setIsUploading(true)
    
        values?.images?.forEach(doc => {
    
          let formdata = new FormData()
    
          formdata.append('file', doc)
          formdata.append('end_deal_id', query.id)
    
          fetch(`${process.env.NEXT_PUBLIC_HOST}/document`, {
            method: 'POST',
            body: formdata
          })
          .then(res => res.json())
          .then(json => {
            console.log(json)
            // setIsUploading(false)
            reload()
          })
    
        })
        
    
      }

    const handleDrop = useCallback(
        (acceptedFiles) => {
          setValue(
            'images',
            acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          );
        },
        [setValue]
      );
    
      const handleRemoveAll = () => {
        setValue('images', []);
      };
    
      const handleRemove = (file) => {
        const filteredItems = values.images?.filter((_file) => _file !== file);
        setValue('images', filteredItems);
      };

    const [expanded, setExpanded] = useState(false);

    function handleAccordion() {
        setExpanded(!expanded)
    }

    return (
        <Box >
            <h2>Исходящие данные</h2>
        {/* <RHFSwitch name="inStock" label="В продаже" /> */}

        <Stack spacing={3} mt={2} >
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <RHFTextField name="end_summ" type="number" size="small" sx={{width: 160, mr: 2}} label="Отпускная сумма" />
                
                <Card sx={{width: 320}}>
                <Accordion  expanded={expanded} onChange={handleAccordion}>
                    <AccordionSummary sx={{px:2}} aria-controls="panel1d-content" id="panel1d-header" expandIcon={<p style={{fontSize: 32}}>+</p>}>
                    <Typography>Файлы - {currentUser?.end_files?.length} шт</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <div>
                        <Box sx={{mb:2}}>
                            {currentUser?.end_files?.map(file => (
                                
                                    <Box key={file.id} sx={{mb: 0, display: 'flex', alignItems: 'center', mr: 2, width: '100%', pr: 2 }}>
                                        <Box sx={{
                                        width: 30,
                                        height: 30,
                                        p: 0,
                                        borderRadius: 3,
                                        mr: 1
                                        }}>
                                        <PlanPremiumIcon/>
                                        </Box>
                                        
                                        <a href={`${process.env.NEXT_PUBLIC_HOST}/public/${file.name}`} target="_blank">
                                            <p style={{wordBreak: 'break-word', fontSize: 14}}>{file?.name?.slice(14)}</p>
                                        </a>
                                    </Box>
                                ))
                            }
                            </Box>

                            <RHFUploadMultiFile
                            name="images"
                            showPreview
                            // maxSize={3145728}
                            onDrop={handleDrop}
                            onRemove={handleRemove}
                            isLoading={false}
                            onRemoveAll={handleRemoveAll}
                            onSubmitFile={onSubmitFile}
                            />
                        </div>
                    </AccordionDetails>
                </Accordion>
                </Card>
                
                
            </Box>
            
            
            <PaymentBlock contragents={contragents} type="end" dealSumm={currentUser?.end_summ} dealId={currentUser?.id}></PaymentBlock>
        </Stack>
        </Box>
    )

}