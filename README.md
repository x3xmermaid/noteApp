# noteApp
simple Application that can be use for take a simple note

this the format body you can use in postman
{
	"title" = "MMMM",
	"note" = "mermaid",
	"idCategory" = 1,
	"id" = 2
}
  
#http method (get)
show all note
 => localhost:3001/note

search note by title
 => localhost:3001/note?title=mermaid

pagination (default data per page is 3)
 => localhost:3001/note?page=1
 if you want to change default data per page
 => localhost:3001/note?page=1&count=4
 #it will show 4 data per page
 
 sorting (sorting order default by id)
 => localhost:3001/note?sorting=desc
 
 you can use all the all query in one
 => localhost:3001/note?page=1&sorting=desc&title=mermaid
 it will show data with title mermaid sorting descending order by id and 3 data per pages
 
 #http method (patch)
 update all data 
 localhost:3001/note
 body: example 
 {
	"idCategory" = 1,
  }
it will update all id category to 1
 
 update data per id
 localhost:3001/note?id=2
 body: example 
 {
	"idCategory" = 1,
 }
 it will just update id category in id 2
