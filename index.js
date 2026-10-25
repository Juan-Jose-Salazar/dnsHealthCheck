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
            const mxRecords = await dns.resolveMx(domain, {signal})
            const txtRecords = await dns.resolveTxt(domain, {signal})

            clearTimeout(timeoutId)

            console.info('-------------------ADDRESSES-----------------------')
            console.table(addresses)

            console.info('-------------------MXRECORDS-----------------------')
            console.table(mxRecords)
            
            console.info('-------------------TXTRECORD-----------------------')
            console.table(txtRecords)


        } catch (error) {
            console.log('something went wront', error)
            clearTimeout(timeoutId)
            
        }
    }
}

searchDns(domains)

