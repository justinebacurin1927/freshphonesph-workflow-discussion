import {createServer} from 'node:http';
import {readFile, stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.resolve(fileURLToPath(new URL('../dist/',import.meta.url)));
const port=Number(process.env.PORT || 4173);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.json':'application/json; charset=utf-8'};
createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://localhost');
  const target=path.resolve(root,'.'+decodeURIComponent(url.pathname));
  if(target!==root&&!target.startsWith(root+path.sep)){res.writeHead(403);res.end('Forbidden');return;}
  const file=(await stat(target)).isDirectory()?path.join(target,'index.html'):target;
  res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('Cache-Control','no-cache');
  res.end(await readFile(file));
 }catch{res.writeHead(404);res.end('Not found');}
}).listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}`));
