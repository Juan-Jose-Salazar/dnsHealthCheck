const dns = require('dns').promises


const domains = process.argv.slice(2)





async function searchDns(domains){
    for(domain of domains){
        const controller = new AbortController()
        const signal = controller.signal;

        const timeoutId = setTimeout(function(){
            controller.abort()
        }, 2000)
        try {
            const addresses = await dns.resolve4(domain, {signal})
            clearTimeout(timeoutId)
            console.log(addresses)
        } catch (error) {
            console.log('something went wront', error)
            clearTimeout(timeoutId)
            
        }
    }
}

searchDns(domains)

