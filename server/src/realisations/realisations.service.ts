import { Injectable } from '@nestjs/common';
import { CreateRealisationDto } from './dto/create-realisation.dto';
import { UpdateRealisationDto } from './dto/update-realisation.dto';
import rp from 'request'
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map, Observable } from 'rxjs';

@Injectable()
export class RealisationsService {

  constructor(private httpService: HttpService) {}


  create(createRealisationDto: CreateRealisationDto) {
    return 'This action adds a new realisation';
  }

  async findAll(): Promise<any> {

    const url = encodeURI('http://server/1CBase/odata/standard.odata/Document_РеализацияТоваров?$orderby=Date desc')

    const token = '0JDQtNC80LjQvdC40YHRgtGA0LDRgtC+0YA6MjAxMw=='

    return await this.httpService.get(url, {
      params: {
        $format: 'json',
        $top: 200,
        $expand: 'Ответственный,Контрагент,Склад'
        // $orderby: 'Date desc',
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic '+ token
      },
    }).pipe(map((res) => {

        return res.data?.value

    }))
  
  }

  async findOne(id: string) {

    const url = encodeURI(`http://server/1CBase/odata/standard.odata/Document_РеализацияТоваров?$filter=Ref_Key eq guid'${id}'`)
    const url2 = encodeURI(`http://server/1CBase/odata/standard.odata/Document_РеализацияТоваров_Товары?$filter=Ref_Key eq guid'${id}'`)
    
    const token = '0JDQtNC80LjQvdC40YHRgtGA0LDRgtC+0YA6MjAxMw=='

    const data = await lastValueFrom(
      this.httpService.get(url, {
        params: {
          $format: 'json',
          $expand: 'Ответственный,Контрагент,Склад'
          // $orderby: 'Date desc',
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic '+ token
        },
      }).pipe(map((res) => {
  
        return res.data?.value?.[0]
  
      }))
    );
    const data2 = await lastValueFrom(
      this.httpService.get(url2, {
        params: {
          $format: 'json',
          $expand: 'Номенклатура'
          // $orderby: 'Date desc',
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic '+ token
        },
      }).pipe(map((res) => {
  
        return res.data?.value
  
      }))
    );
    data['Товары'] = data2
    // const promise3 = this.httpService.get(URL3);
      console.log(data, data2)
    return data

    return await this.httpService.get(url, {
      params: {
        $format: 'json',
        $expand: 'Ответственный,Контрагент,Склад'
        // $orderby: 'Date desc',
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic '+ token
      },
    }).pipe(map((res) => {

      return res.data?.value?.[0]

    }))
  }

  update(id: number, updateRealisationDto: UpdateRealisationDto) {
    return `This action updates a #${id} realisation`;
  }

  remove(id: number) {
    return `This action removes a #${id} realisation`;
  }
}
