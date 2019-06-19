# noteApp
simple Application that can be use for take a simple note

this the format body you can use in postman</br>
{ </br>
 	 "title" = "MMMM", </br>
	"note" = "mermaid", </br>
	"idCategory" = 1, </br>
	"id" = 2 </br>
} </br>
  
#http method (get)</br>
show all note</br>
 => localhost:3001/note</br>

search note by title</br>
 => localhost:3001/note?title=mermaid</br>

pagination (default data per page is 3) </br>
 => localhost:3001/note?page=1</br>
 if you want to change default data per page</br>
 => localhost:3001/note?page=1&count=4 </br>
 #it will show 4 data per page </br>
 
 sorting (sorting order default by id) </br>
 => localhost:3001/note?sorting=desc </br>
 
 you can use all the all query in one </br>
 => localhost:3001/note?page=1&sorting=desc&title=mermaid </br>
 it will show data with title mermaid sorting descending order by id and 3 data per pages </br>
 
 #http method (patch) </br>
 update all data  </br>
 localhost:3001/note </br>
 body: example  </br>
 { </br>
	"idCategory" = 1, </br>
  } </br>
it will update all id category to 1 </br>
 
 update data per id </br>
 localhost:3001/note?id=2 </br>
 body: example  </br>
 { </br>
	"idCategory" = 1, </br>
 } </br>
 it will just update id category in id 2 </br>
