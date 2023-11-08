const whiteList = ['http://localhost:3000']

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