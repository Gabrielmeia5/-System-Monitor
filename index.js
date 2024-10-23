const os = require('node:os');
const { createLog, verifyLog } = require('./log-utils');

let logCount = 1;

verifyLog();

function systemNameFormat() {
    const platforms = {
        win32: "Windows",
        linux: "Linux"
    };
    return platforms[os.platform()] || "Sistema não reconhecido!";
}

function convertUptime() {
    const uptimeInSeconds = os.uptime();
    const hours = Math.floor(uptimeInSeconds / 3600);
    const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
    return { hours, minutes };
}

function percentageMemory() {
    return ((os.totalmem() - os.freemem()) / os.totalmem()) * 100;
}

function systemMonitoring(logNumber) {
    const systemName = systemNameFormat();
    const systemArch = os.arch();
    const typeCPU = os.cpus()[0].model;
    const memoryUsage = percentageMemory();
    const { hours, minutes } = convertUptime();

    return `
    Log: ${logNumber}
    Nome do sistema operacional: ${systemName}
    Arquitetura do sistema: ${systemArch} bits
    Modelo do processador: ${typeCPU}
    Tempo de atividade do sistema: ${hours} horas e ${minutes} minutos
    Uso de memória: ${memoryUsage.toFixed(2)}%
    `;
}

setInterval(() => {
    const logData = systemMonitoring(logCount);
    console.log(logData);
    createLog(logData);
    logCount++;
}, 1000);
