# ionic-filmes
Aplicativo de filmes feito em ionic

###Setup
1. npm install
2. bower install
3. ionic plugin add https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin.git

### Divisão do aplicativo

O aplicativo se divide basicamente em 3 partes, todas contidas no menu lateral.  
1. Favoritos - Esta é a página principal e de entrada do aplicativo  
2. Estréias - Mostra a lista de filmes que irão estrear em breve  
3. Atores - Mostra uma lista de atores populares em hollywood  

### Favoritos

Essa página visa a dar um ar mais personificado ao usuário e guarda seus dados no localstorage,  
fazendo uso do service: FavoriteService.  
Inicialmente a página inicial não dispõe de nenhum filme favoritado e, portanto, instrui o usuário a adicionar filmes,
seja através da busca ou através da lista de filmes de estréia.  
A página permite visualizar os detalhes do filme favoritado, mas sem as mídias sociais.
Também permite buscar filmes por palavra-chave.

#####Melhorias
Permitir o usuário criar anotações sobre seus filmes favoritos na página de detalhes.

### Estréias
Seção mais completa do aplicativo, com as seguintes funcionalidades:

* Favoritar e desfavoritar na própria listagem os filmes disponíveis;
* Filmes favoritados são marcados de verde, enquanto filmes default ficam com a cor roxo;
* Navegar para paǵina de detalhes do filme;
* Favoritar o filme na página de detalhes;
* Compartilhar o filme nas redes sociais;
* Carregar mais filmes
* Recarregar filmes, pois novos filmes tem a possibilidade remota de chegar.

#####Melhorias
Permitir na página de detalhes o usuário desfavoritar o filme, depois de favoritado. Atualmente, depois de favoritado o botão  
fica desabilitado.

#####Considerações
Só foi disponibilizada a opção de favoritar e desfavoritar na listagem de estréias e filmes buscados.
Não haveria problema em implementar também na página dos favoritos, mas optou-se por não,
pois neste caso o usuário só teria a opção de desfavoritar, o que difere um pouco da idéia das outras listagens.

Meu aparelho não permitia compartilhamento no twitter e facebook, portanto não foi testado
o compartilhamento nessas redes sociais, caso o aparelho comporte tal compartilhamento.


### Astros do Cinema

A seção de astros do cinema lista os atores mais populares de hollywood. Clicando sobre um deles
o aplicativo oferece uma distribuição de filmes bons e ruins do ator a título de curiosidade do usuário.
Essa distribuição é obtida, através de diversas solicitações à API, **por tal motivo é guardada em cache no PersonService**.

#####Melhorias
Listar um a um os filmes que compõem a distribuição de qualidade com a respectiva nota.

#####Considerações
A página de detalhes dos atores fugiu um pouco ao solicitado, pois caso contrário se pareceria muito à página de detalhes
dos filmes. Dessa, forma optou-se pela utilização de gráficos, utilizando chart-angular e chart.js.

### Resultados da busca

Essa seção possui as mesmas funcionalidades da seção de estréias e foi incorporada pela seção de favoritos.


###Fotos

![foto1](./www/img/readmeImages/1.jpg)
![foto2](./www/img/readmeImages/2.jpg)
![foto3](./www/img/readmeImages/3.jpg)
![foto4](./www/img/readmeImages/4.jpg)
![foto5](./www/img/readmeImages/5..jpg)
![foto6](./www/img/readmeImages/6.jpg)





