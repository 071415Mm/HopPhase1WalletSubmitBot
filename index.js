import axios from 'axios';
import { log } from 'console';
import fs from 'fs'; // 使用 ES 模块导入 fs
import readline from 'readline'; // 使用 ES 模块导入 readline
const rl = readline.createInterface({
    input: fs.createReadStream('address.txt'),
    crlfDelay: Infinity // 允许对不同平台的换行符进行兼容
  });
const address = [];
let index = 1;
rl.on('line', (line) => {
    address.push(line);
    
    index+=1;
    
});

rl.on('close',async ()=>{
    console.log('所有地址已读取完毕，开始提交...');
    try {
        for(let addr of address){
            await Post(addr);
            console.log(`已提交地址: ${addr}`);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    } catch (error) {
        console.log("出现错误"+ error);
        
    }
})
async function Post(address) {
    const info = await axios.post('https://hop.ag/api/trpc/public.submitPhase1Wallet?batch=1',{
        "0": {
          "json": {
            "suiAddress": address
          }
        }
      }
      
      
);
}
