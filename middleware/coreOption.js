const whiteList = ['http://localhost:3000' , 'https://todouserlist.vercel.app', 'todouserlist.vercel.app']

export const corsOptions = {
    origin:(origin , callBack)=>{
        if(whiteList.indexOf(origin) !== -1 || !origin){
            callBack(null , true)
        }else {
            callBack('block by cors' , false)
        }
    },
    credentials:true ,
    optionsSuccessStatus:200
}
