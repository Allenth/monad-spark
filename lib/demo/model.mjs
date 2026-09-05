export const people = {seller:'星河设备（乙方）',buyer:'远山工程（指定甲方）',other:'其他演示账号',guest:'访客'};
export const seed = () => [
 {id:'DEMO-1001',title:'设备采购 · 第一期',status:'pending',buyer:'buyer',created:'2026-09-05 15:00',history:['乙方已确认并发起（模拟）']},
 {id:'DEMO-1002',title:'厂区维护 · 服务合同',status:'signed',buyer:'buyer',created:'2026-09-05 14:30',history:['乙方已确认并发起（模拟）','甲方已签署（模拟）']},
 {id:'DEMO-1003',title:'设备采购 · 旧版本',status:'cancelled',buyer:'buyer',created:'2026-09-05 14:00',history:['乙方已确认并发起（模拟）','乙方撤销待签记录（模拟）']},
];
export function transition(record,action,role,registered,matching){
 if(!record)throw Error('记录不存在');
 if(record.status!=='pending')throw Error('记录已签署或已撤销，不能再次操作');
 if(action==='cancel') {if(role!=='seller')throw Error('只有发起方可以撤销');return {...record,status:'cancelled',history:[...record.history,'乙方撤销待签记录（模拟）']};}
 if(action!=='sign')throw Error('不支持的操作');
 if(role!==record.buyer)throw Error('你不是这份记录指定的甲方');
 if(!registered)throw Error('请先注册演示账号');
 if(!matching)throw Error('两份文件必须与原记录一致');
 return {...record,status:'signed',history:[...record.history,'甲方已签署（模拟）']};
}
