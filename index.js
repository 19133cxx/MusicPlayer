var http=require('http')
var path=require('path')//文件路径
var fs=require('fs')
var url=require('url')

 function staticRoot(staticPath,req,res){
   var pathobj=url.parse(req.url,true);
   console.log(pathobj.pathname)
   if(pathobj.pathname==='/'){
   	 pathobj.pathname+='test.html'
   }

   var filepath=path.join(staticPath,pathobj.pathname);
   console.log(filepath)
   fs.readFile(filepath,'binary',function(err,fileContent){
   	if(err){
   		res.writeHead(404,'not found')
   		res.end('<h1>404 Not Found</h1>')
   	}else{
   		res.writeHead(200,'ok')
   		res.write(fileContent,'binary')
   		res.end()
   	}
   })

 }

var server=http.createServer(function(req,res){
	switch(req.url)
	{
		
		case '/getWeather':
            res.end(JSON.stringify({a:1,b:2}))
        default:
           console.log(__dirname)
            staticRoot(__dirname,req,res);//最终得到static的绝对路径
	}
	

})
server.listen(8080)
