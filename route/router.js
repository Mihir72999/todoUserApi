import express from 'express'
import prisma from '../db/prisma.js'

const router = express.Router()

router.route('').get((_ , res)=>{
    res.json({message:"welcome to todo api"})
})

router.route('/getUser').get(async(req,res)=>{
  try{      
    const data = await prisma.user.findMany()
    res.status(200).json(data)
  }catch(err){
    res.status(404).json(err)
  }
})
router.route('/postUser').post(async(req,res)=>{
    const {name , email ,password  } = req.body
    try {
        const user = await prisma.user.findFirst({where:{name }})
        if(!user){   
            
            const createUser = await prisma.user.create({
                data:{name ,email , password }
            }) 
            res.status(201).json({
                success:true,
                createUser,
                message:'user created succesfully'})
            }else{
              res.status(400).json({
                success:false,
                message:'user already register'
              })
            }
            
    } catch (error) {
        res.status(500).json(error)
    }
})



router.route('/updateUser/:name').patch(async(req,res)=>{
const {name , email , password} = req.body
const userName = req.params.name
try {
  const user = await prisma.user.findFirst({where:{password , name:userName}})
  if(user){
   const data =  await prisma.user.updateMany({where:{name:user.name},data:{name , email}})
  res.status(201).json({message:`${user.name} has been updated` , data})  
}else{
    res.status(404).json({message:'user not found'})
  }  
} catch (error) {
   res.status(500).json(error) 
}
})

router.route('/deleteUser').delete(async(req,res)=>{
 const { password} = req.body
 try{
  const user = await prisma.user.findFirst({where:{password}})
  if(user){
    await prisma.user.deleteMany({where:{name:user.name}})
  res.status(200).json({message:`${user.name} has been deleted`})  
}else{
  res.status(404).json({message:'user not found'})
  }
 }catch(err){
res.status(500).json(err)
 }
})

router.route('*').all((req,res)=>{
    res.status(400).json({message:"path not found witch you entered"})
})

export default router 
