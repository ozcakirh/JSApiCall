/* JS ile Api Çağırma */
/* Hüseyin ÖZÇAKIR, 24.08.2022  */






let hcrequest = hcobj => {
    // Promise
    return new Promise((resolve,reject) => {

        // nesneyi olustur
        let xhr = new XMLHttpRequest();

        // Adresi Aç
        // xhr.open(ilk Başta Method Tipi, GET, POST, DELETE PUT);

        // Eğer Method Belirtilmedi ise, GET Gönder .
        // || Or Operatoru,hcobj.method null ise GET gonder değilse method neyse onu gonder
        xhr.open(hcobj.method || 'GET', 
        hcobj.url || 'https://jsonplaceholder.typicode.com/posts/8');

        // Header var ise önce onları düzenleyelim
        if (xhr.headers)
        {
            Object.Keys[hcobj.headers].forEach(Anahtar => {
                
                // Headere bilgi ekle
                xhr.setRequestHeader(Anahtar, hcobj)
            });
        }

        // Herhangi bir parametre göndermiyoruz o yüzden () => 
        //              parametre gönderseydik (prm) =>
        xhr.onload = () => {
            //if (xhr.status === 200) bazen Post methodlarda 201 de gelebilir
            if (xhr.status >= 200 && xhr.status < 300
                )
                {
                   // console.log("Response" + xhr.response + xhr.status );
                    resolve(xhr.response);
                }
                else
                {
                  // Hatalı Sonuç Geliyor instanceof
                  reject(xhr.statusText)  ;
                }

        };

        xhr.onerror = ()=> {
            reject(xhr.statusText);
        }

        xhr.send(hcobj) ;//.body);

    })
}




function jGetir()
{
    let Index = "19";

    var jTxtValue = document.getElementById("otxtId"); //.Text;

    var jspnBaslik = document.getElementById("spnBaslik"); //.Text;

    var jspnIcerik = document.getElementById("spnIcerik"); //.Text;
    
    if (jTxtValue != null) {
        Index = jTxtValue.value.toString();
    
    }

    let UrlAdres = "https://jsonplaceholder.typicode.com/posts/"+ Index.toString();

   // hcmyObj.url = UrlAdres;

   let hcmyObj = {

    //method: "GET",
    //url:"https://jsonplaceholder.typicode.com/posts/8",
    method: "GET",
    url: UrlAdres.toString(), //(""+Index),
    headers : {
        "Content-Type": "application/json" 
       , "id":"8"
       
    }
    ,body :  {
        'id':'8'
        
    } 
    

}   
    
    hcrequest(hcmyObj)
// resolve dan gelen bilgi DataVeri degiskenine aktrılacak
.then(DataVeri=>{
    let Mesaj = JSON.parse(DataVeri);

   //console.log(DataVeri);
    console.log(Mesaj.title);
    console.log(Mesaj);

    jspnBaslik.innerHTML =  Mesaj.id + "<hr/> Başlık <br/> " + Mesaj.title + "<hr/>";
    jspnIcerik.innerHTML = Mesaj.body;


})
.catch(error =>{
    
    console.log("Hata " + (error || "Error Degiskeni Tanımlı Değil"));
    //console.log(error)
});

}