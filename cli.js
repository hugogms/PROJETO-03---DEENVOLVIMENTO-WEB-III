import pegaArquivo from "./app.js";
import chalk from "chalk";
import validaURL, { validaUmSite } from "./httpValidacao.js";

const caminho = process.argv;

async function processaTexto(caminhoDoArquivo){
    const entrada = caminhoDoArquivo[2];

    if (!entrada) {
        console.log(chalk.red("informe a URL de um site ou o caminho do arquivo."));
        return;
    }

    if (entrada.startsWith("http://") || entrada.startsWith("https://")) {
        await validaUmSite(entrada);
        return;
    }

    const resultado = await pegaArquivo(entrada);

    if(caminho[3] == 'validar'){
        console.log(chalk.yellow("links validados"), await validaURL(resultado));
    }
    else{
        console.log(chalk.yellow("lista de links"), resultado);
    }
}

processaTexto(caminho);