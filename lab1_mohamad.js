"use strict"

const dayjs=require('dayjs');
const sql=require('sqlite3')
let crop=t=>{
    return t.map(x=>{return x.slice(0,2)+x.slice(-2,x.length)});
        
}

let create_task=function(id,description,urgent,priv,deadline=undefined){

    this.id=id;
    this.description=description;
    this.urgent=urgent;
    this.private=priv;
    this.deadline=deadline;
}


let task_lists=function()
{
    
     this.ls=[];
     //ex2
    const db=new sql.Database("tasks.db",(err)=>{
        if(err==null)
        {
            console.log('everything is okay');
        }
    });
    this.all=async()=>{
        return new Promise((resolve,reject)=>{
            db.all("select * from tasks",(err,data)=>{
                if(err)
                reject(err)
                else
                {
                data.forEach(x=>{this.ls.push(x);
                    console.log(x)
                });
                resolve(this.ls)
                }
            })})};
    this.contain=async(x)=>
    {
        return new Promise((resolve,reject)=>{
            x='%'+x+'%'
            let s=`select * from tasks where description like ? `
            db.all(s,[x],(err,data)=>{
                if(err)
                reject(err)
                else
                {
                data.forEach(x=>{this.ls.push(x);
                    console.log(x)
                });
                resolve(this.ls)
                }
            })})};
            this.after=async(x)=>
            {
                return new Promise((resolve,reject)=>{
                    let s=`select * from tasks where deadline> ?`
                    db.all(s,[x],(err,data)=>{
                        if(err)
                        reject(err)
                        else
                        {
                        data.forEach(x=>{this.ls.push(x);
                            console.log(x)
                        });
                        resolve(this.ls)
                        }
                    })})};
    
 }
            
   // ex1 
 /*   this.add=(x)=>
    {
        ls.push(x);
    }*/
 /*   this.sortandprint=()=>
    {
            let f=ls.sort((a,b)=>{
            if(a.deadline==null)
                return 1
            if(b.deadline==null)
                return -1
            return a.deadline.subtract(b.deadline);
        })
        f.forEach(x=>console.log(x))
    }

    this.findandprint=()=>
    {
        ls.filter(s=>s.urgent==true).forEach(x=>console.log(x))
    }*/


/*let a=new create_task(1,'do something',true,false,dayjs('2021-3-27T16:00'))
let b=new create_task(2,'do lab',true,false,dayjs('2021-3-26T14:00'))
let c=new create_task(3,'do nothing',false,true,dayjs('2021-3-28T10:00'))
let g=new create_task(4,'do nothing2',false,true)
let tasks=new task_lists();
tasks.add(a);
tasks.add(b);
tasks.add(c);
tasks.add(g)

tasks.sortandprint();
tasks.findandprint();
*/
let main=async()=>{
    let a=new task_lists();

  const f= await a.contain('laundry')
 //  const  b= await  a.after('2021-03-08T15:20:00.000Z');
   debugger;
}
main();
