import chalk from 'chalk';
import fs from 'fs';

const texto = "A interface File provê informações sobre arquivos e permite ao JavaScript  a acessar seu conteúdo.São geralmente recuperados a partir de um objeto [FileList](https://developer.mozilla.org/pt-BR/docs/Web/API/FileList) que é retornado como resultado da seleção, pelo usuário, de arquivos através do elemento [<input>](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input), a partir do objeto [DataTransfer](https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer) utilizado em operações de arrastar e soltar, ou a partir da API `mozGetAsFile()` em um [HTMLCanvasElement](https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement). Em Gecko, códigos com privilégiios podem criar objetos File representando qualquer arquivo local sem a intereção do usuário (veja [Implementation notes](https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes) para mais informações.)"

function trataErro(erro){
    throw new Error(chalk.bgRed.white(erro.code, "Arquivo com problema"))
}

function extraLinks(texto){
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm
    const arrayResultados = [];

    let temp;
    while((temp = regex.exec (texto)) != null) {
        arrayResultados.push({[temp[1]] : [temp[2]]})
    }
    return arrayResultados.length == 0 ? "não ha links" : arrayResultados;
}



async function pegaArquivo(caminhoDoArquivo){
    try{
        const texto = await fs.promises.readFile(caminhoDoArquivo, 'utf-8')
        return(extraLinks(texto))
    }catch(erro){
        trataErro(erro);
    }
}

/*
async function pegaArquivo(caminhoDoArquivo){
    const texto = await fs.promises.readFile(caminhoDoArquivo, 'utf-8')
    console.log(chalk.bgBlueBright(texto))
}
*/

/*
function pegaArquivo(caminhoDoArquivo){
    const encodig = 'utf-8';
    fs.promises
    .readFile(caminhoDoArquivo, encodig)
    .then((texto)=> console.log(chalk.bgGreen(texto)))
    .catch((erro) => trataErro(erro))
}
*/

//pegaArquivo('./arquivos/texto.md')

export default pegaArquivo;