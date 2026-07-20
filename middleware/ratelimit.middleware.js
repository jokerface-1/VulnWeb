const limit = new Map()

export const limiter = (req, res, next)=>{

    const ip = req.headers["x-forwarded-for"] || req.ip;
    console.log(limit.size)
    if (!limit.has(ip)){
        limit.set(ip, {
            count: 1,
            attempt:Date.now()
        })

    }
    
    else{
            const data  = limit.get(ip)
            data.count++
            console.log(data.attempt)
            console.log(data.count)
            const time = 15 * 60 *1000;
            console.log(time)
            if(data.count > 5){
                setTimeout(() => {
                    limit.clear()                    
                }, time);
                return res.json({
                    "message":"Login limit exeded so wait 15 minutes",
                    "time":Date.now().toString()
                })
            
            }
    }
    next();
}