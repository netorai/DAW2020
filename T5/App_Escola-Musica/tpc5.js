var http = require('http')
var axios = require('axios')

http.createServer(function (req, res) {
    console.log(req.method + ' ' + req.url)
    if(req.method == 'GET'){
        if(req.url == '/'){
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write('<h2>Escola de Música</h2>')
            res.write('<ul>')
            res.write('<li><a href="/alunos">Lista de Alunos</a></li>')
            res.write('<li><a href="/cursos">Lista de Cursos</a></li>')
            res.write('<li><a href="/instrumentos">Lista de Instrumentos</a></li>')
            res.write('</ul>')
            res.end()
        }
        else if(req.url == '/alunos'){
            axios.get('http://localhost:3001/alunos')
            .then(function (resp) {
                alunos = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write('<h2>Escola de Música: Lista de Alunos</h2>')
                res.write('<ul>')
            
                alunos.forEach(a => {
                    res.write(`<li><a href="/alunos/${a.id}">${a.id} - ${a.nome}</a></li>`)
                    //res.write('<li>' + a.id + ' - ' + a.nome + '</li>')
                });

                res.write('</ul>')
                res.write('<address>[<a href="/">Voltar</a>]</address>')
                res.end()
            })
            .catch(function (error)  {
                console.log('Erro na obtenção da lista de alunos: ' + error);
            });             
        }

        else if(req.url == '/cursos'){
            axios.get('http://localhost:3001/cursos')
            .then(function (resp) {
                cursos = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write('<h2>Escola de Música: Lista de Cursos</h2>')
                res.write('<ul>')
        
                cursos.forEach(c => {
                    res.write('<li>' + c.id + ' - ' + c.designacao + '</li>')
                });

                res.write('</ul>')
                res.write('<address>[<a href="/">Voltar</a>]</address>')
                res.end()
            })
            .catch(function (error)  {
                console.log('Erro na obtenção da lista de cursos: ' + error);
             }); 
         }

         else if(req.url == '/instrumentos'){
            axios.get('http://localhost:3001/instrumentos')
            .then(function (resp) {
                instrumentos = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write('<h2>Escola de Música: Lista de Instrumentos</h2>')
                res.write('<ul>')
                
                instrumentos.forEach(i => {
                    res.write('<li>' + i.id + ' - ' + i["#text"] + '</li>')
                });

                res.write('</ul>')
                res.write('<address>[<a href="/">Voltar</a>]</address>')
                res.end()
            })
            .catch(function (error)  {
                console.log('Erro na obtenção da lista de instrumntos: ' + error);
             }); 
         }

         else if(/\/alunos\/[A-Z][0-9]+$/.test(req.url)){
            var idAluno = req.url.split("/")[2]
            axios.get('http://localhost:3001/alunos/' + idAluno)
            .then(function (resp) {
                idA = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write('<h2>Informações do Aluno (ID): ' + idAluno + '</h2>')
                res.write('<ul>')
            
                res.write('<li> NOME: ' + idA.nome + '</li>')
                res.write('<li> DATA DE NASCIMENTO: ' + idA.dataNasc + '</li>')
                //res.write(`<li> CURSO: <a href="/cursos/${idA.curso}">${idA.curso}</a></li>`)  - link para buscar a info do curso a partir do ID
                res.write('<li> CURSO: ' + idA.curso + '</li>')    
                res.write('<li> ANO DO CURSO: ' + idA.anoCurso + '</li>')
                res.write('<li> INSTRUMENTO: ' + idA.instrumento + '</li>')

                res.write('</ul>')
                res.write('<address>[<a href="/">Voltar</a>]</address>')
                res.end()
            })
            .catch(function (error)  {
                console.log('Erro na obtenção da informação do aluno: ' + error);
            });    
         }
         //Lógica para leitura do curso ID - PORÉM, NA BASE DE DADOS DOS CURSOS NÃO ESTÃO CADASTRADOS TODOS OS CÓDIGOS COM OS RESPETIVOS CURSOS
         /*else if(/\/cursos\/[A-Z]+[0-9]+$/.test(req.url)){
            var idCurso = req.url.split("/")[2]
            axios.get('http://localhost:3001/cursos/' + idCurso)
            .then(function (resp) {
                idC = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write('<h2>Informação do Curso: ' + idCurso + '</h2>')
                res.write('<ul>')
            
                res.write('<li> Nome: ' + idC.designacao + '</li>')
                res.write('<li> Duração: ' + idC.duracao + '</li>')
                
                res.write('</ul>')
                res.write('<address>[<a href="/">Voltar</a>]</address>')
                res.end()
            })
            .catch(function (error)  {
                console.log('Erro na obtenção da informação do respetivo curso: ' + error);
            });    
         }*/

        else{
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>Pedido não suportado: " + req.method + " " + req.url + "</p>")
            res.end() 
        }
    }
    else{
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
        res.write("<p>Pedido não suportado: " + req.method + " " + req.url + "</p>")
        res.end()
    }
    
}).listen(4000)

console.log('Servidor à escuta na porta 4000...')
