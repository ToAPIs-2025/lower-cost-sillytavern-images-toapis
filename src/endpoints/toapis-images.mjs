import { generateToAPIsImage } from '../../toapis_tools/toapis_bridge.mjs';
export async function handleToAPIsImage(request,response) {
  if(!process.env.TOAPIS_API_KEY)return response.status(400).json({error:'Configure TOAPIS_API_KEY on the server'});
  const b=request.body;
  const allowed=new Set(['toapis','model','prompt','size','n','run_id']);
  if(Object.keys(b).some(k=>!allowed.has(k)) || b.n && b.n!==1)return response.status(400).json({error:'Unmapped image options'});
  try {
    const result=await generateToAPIsImage({model:b.model,prompt:b.prompt,size:b.size,run_id:b.run_id});
    return response.json({created:Math.floor(Date.now()/1000),data:[{b64_json:result.b64_json}],toapis:{task_id:result.task_id,model:result.model,quote_usd:result.quote_usd,actual_charge_usd:null}});
  } catch {return response.status(502).json({error:'Image task failed or is pending; reconcile private state before retrying'});}
}
