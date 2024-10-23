const fs = require('node:fs');

function createLog(content) {
    fs.appendFile('./logs.txt', content, 'utf-8', (error) => {
        if (error) {
            console.log('Erro ao criar o log:', error.message);
        }
    });
}

function verifyLog() {
    fs.access('./logs.txt', fs.constants.F_OK, (err) => {
        if (!err) {
            fs.unlink('./logs.txt', (error) => {
                if (error) {
                    console.log('Erro ao excluir o arquivo:', error.message);
                }
            });
        }
    });
}

module.exports = {
    createLog,
    verifyLog
};
