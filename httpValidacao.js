import fetch from "node-fetch";

const statusTexto = {
  200: "OK",
  301: "Moved Permanently",
  302: "Found",
  403: "Forbidden",
  404: "Not Found",
  500: "Internal Server Error"
};

export async function validaUmSite(url) {
  try {
    const res = await fetch(url);
    const status = res.status;
    const msg = statusTexto[status] || "";

    console.log(`Site: ${url}`);
    console.log(`Status Code: ${status}${msg ? " – " + msg : ""}`);
  } catch (erro) {
    console.log(`Erro no site: ${url} (Verifique a URL)`);
  }
}

function checaStatus(arrayURL){
  return Promise.all(arrayURL.map(async url => {
    try {
      const res = await fetch(url);
      return res.status;
    } catch {
      return "Link indisponível";
    }
  }));
}

function geraArrayURL(arrayLinks){
  return arrayLinks.map(objetoLink => Object.values(objetoLink).join());
}

async function validaURL(arrayLinks){
  if (typeof arrayLinks === 'string') return arrayLinks;
  const links = geraArrayURL(arrayLinks);
  return await checaStatus(links);
}

export default validaURL;