import { handleToAPIsImage } from './src/endpoints/toapis-images.mjs';
let input='';for await (const c of process.stdin)input+=c;
let job=JSON.parse(input),status=200;
let response={status(n){status=n;return this;},json(value){if(status!==200)throw new Error(JSON.stringify(value));console.log(JSON.stringify({...value.toapis,b64_json:value.data[0].b64_json}));}};
await handleToAPIsImage({body:{toapis:true,model:job.model,prompt:job.prompt,run_id:job.run_id}},response);
