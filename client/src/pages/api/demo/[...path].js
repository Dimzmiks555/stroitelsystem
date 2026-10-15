import db from '../../../demo/data.json';
export default function handler(req,res){
 if(process.env.NEXT_PUBLIC_DEMO_MODE!=='1')return res.status(404).end();
 if(req.method!=='GET')return res.status(403).json({message:'Деморежим: сохранение отключено'});
 const [resource,id]=req.query.path||[];
 if(resource==='note-products'&&id==='stats'){
  const start=Date.parse(req.query.startDate),end=Date.parse(req.query.endDate),seller=Number(req.query.seller_id);
  const groups={};
  for(const note of db.notes){
   const date=Date.parse(note.Date);
   if((Number.isFinite(start)&&date<start)||(Number.isFinite(end)&&date>end)||(seller&&note.seller_id!==seller))continue;
   for(const product of note.products||[]){
    if(!product.name.toLowerCase().includes(String(req.query.search||'').toLowerCase()))continue;
    const key=product.name+'|'+product.edizm;
    const row=groups[key]||(groups[key]={name:product.name,edizm:product.edizm,total_amount:0,total_summ:0,total_count:0});
    row.total_amount+=product.amount;row.total_summ+=product.summ;row.total_count++;
   }
  }
  const field={summ:'total_summ',amount:'total_amount',count:'total_count'}[req.query.order]||'total_summ';
  return res.status(200).json(Object.values(groups).sort((a,b)=>b[field]-a[field]));
 }
 if(resource==='payment'&&['undefined','null',''].includes(req.query.deal_id))return res.status(200).json({rows:[],count:0});
 let rows=db[resource]||[];
 if(resource==='expense'){
  const object=db.objects.find(o=>o.id===Number(req.query.object_id))||db.objects[0];
  const expenses=[...db.notes.filter(n=>n.object_id===object.id).map(n=>({...n,type:'note'})),...db.checkouts.filter(n=>n.object_id===object.id).map(n=>({...n,type:'checkout'}))];
  return res.status(200).json({object,expenses,start_balance:object.initial_balance,end_balance:object.initial_balance+expenses.reduce((s,n)=>s+n.summ,0)});
 }
 if(resource==='objects'&&id){rows=rows.map(o=>({...o,notes:db.notes.filter(n=>n.object_id===o.id),checkouts:db.checkouts.filter(n=>n.object_id===o.id)}));}
 if(id && /^\d+$/.test(id)){const item=rows.find(r=>r.id===Number(id));return item?res.status(200).json(item):res.status(404).json({message:'Не найдено'});}
 if(resource==='orders'&&req.query.status==='new')rows=rows.filter(r=>r.status!=='Выполнен');
 for(const key of ['object_id','seller_id','buyer_id','contragent_id','deal_id','type'])if(req.query[key]&&req.query[key]!=='undefined')rows=rows.filter(r=>String(r[key])===req.query[key]);
 res.status(200).json(resource==='payment'?{rows,count:rows.length}:rows);
}
