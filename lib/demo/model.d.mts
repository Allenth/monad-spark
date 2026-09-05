export type DemoRecord = {id:string;title:string;status:string;buyer:string;created:string;history:string[]};
export const people:Record<string,string>;
export function seed():DemoRecord[];
export function transition(record:DemoRecord,action:string,role:string,registered:boolean,matching:boolean):DemoRecord;
