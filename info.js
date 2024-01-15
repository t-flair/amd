const si = require('systeminformation');

toGB = (bytes) => {
    gbs = (bytes/1024/1024/1024).toFixed(2);
    return (gbs +" GB");
};

async function cpuData() {
    try {
        let disk = await si.diskLayout();
        const data3 = await si.mem();
        free = toGB(data3.free);
        used = toGB(data3.used);
        all = toGB(data3.total);
        console.log('....  ');
        console.log(toGB(disk[0].size));
       // console.log('used ' + used + ' of ' + all + ' ... ' + free + ' free');
    } catch (e) {
        console.log(e)
    }
}

cpuData()