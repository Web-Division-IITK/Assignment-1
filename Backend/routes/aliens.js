const express=require('express')
const router=express.Router()
const Alien=require('../models/alien')

router.get('/',async(req,res)=>{
    try{
        const aliens= await Alien.find()
        res.json(aliens)
    }
    catch(err){
        res.send('Error'+err)
    }
})

router.post('/',async(req,res)=>{
    const alien=new Alien({
        heading: req.body.heading,
        desc: req.body.desc,
        id: req.body.id,
        date:req.body.date,
        time:req.body.time,
        important:req.body.important,
        performed:req.body.performed,
        work:req.body.work,
        home:req.body.home,
        others:req.body.others,
    })

    try{
        const a1=await alien.save()
        res.json(a1)
    
    }catch(err)
    {
        res.send('Error'+err)
    }
})

router.get('/:id',async(req,res)=>{
    try{
        const alien= await Alien.findById(req.params.id)
        res.json(alien)
    }
    catch(err){
        res.send('Error'+err)
    }
})

router.patch('/:id',async(req,res)=>{
    try{
        const alien=await ALien.findById(req.params.id)
        alien.heading=req.body.heading
        alien.desc=req.body.desc
        alien.date=req.body.date
        alien.time=req.body.time
        alien.important=req.body.important
        alien.performed=req.body.performed
        alien.work=req.body.work
        alien.home=req.body.home
        alien.others=req.body.others
        const a1=await alien.save()
        res.json(a1)
    }
    catch(err)
    {
        res.send('Error'+err)
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const alien=await Alien.findById(req.params.id)
        const a1=await alien.remove()
        res.json(a1)
    }
    catch(err)
    {
        res.send('Error'+err)
    }
})


module.exports=router
