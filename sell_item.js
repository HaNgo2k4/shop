const data_output = document.querySelector('.data_output');
const apiItem = "https://d7gcxr-3000.csb.app/item";
const showInput = document.querySelector('.add_data');
let user_data = JSON.parse(localStorage.getItem('user'));

showInput.addEventListener('click', () => {
    document.querySelector(".input").classList.add('show');
    document.querySelector(".cart-overlay").classList.add('show');
})
document.querySelector(".cart-overlay").addEventListener('click', () => {
    document.querySelector(".input").classList.remove('show');
    initinput();

});
document.querySelector(".close-data").addEventListener('click', () => {
    document.querySelector(".input").classList.remove('show');
    selectors.cartOverlay.classList.remove("show");
    initinput();
});

const initinput = ()=>{
    document.querySelector("#name_item").innerHTML = "";
    document.querySelector("#price_item").innerHTML = "";
    document.querySelector("#qty_item").innerHTML = "";
    document.querySelector(".image_preview").remove();
}
    
function deleteitem(id){
    var item = document.getElementById('item'+id);
    item.style.display = "none";
    axios.delete(apiItem +'/'+id)
  .then(function (response) {
    console.log(1);
  })
  .catch(function (error) {
    console.log(2);
  });
}


    const loadDataItem = async () => {
        axios.get(apiItem+"?_sort=id&_order=desc&iduser=" + user_data.id)
        .then((data_res) => {
            console.log(data_res);
            str_li = '';
            if (data_res.data.length == 0)
            str_li = '<td colspan="4"> <h1>No items in stock</h1></td>';
            else
            data_res.data.forEach((sp) => {
                str_li += `<tr  id="item${sp.id}">
                <td>
                <img src="${sp.image}"></img>
                  </td>
                  
                  <td>
                    <h3>${sp.title}</h3>
                  </td>
                  <td>
                    <h3>${(sp.price).format()}</h3>
                  </td>
                  <td><h3>${sp.quantity}</h3></td>
                  <td class="button_close" onclick="deleteitem(${sp.id})"><button >&times;</button></td>
              </tr>`
                
            });
            document.querySelector('.data_output').innerHTML = str_li;
        })
    }



        function previewfile() {
            const file = document.querySelector("#image").files[0];
            const reader = new FileReader();
    
            reader.addEventListener("load", () => {
                document.querySelector(".image_container").innerHTML = `<img class="image_preview"  src="${reader.result}"/>`;
            }
            );
            if (file) {
                reader.readAsDataURL(file);
            }
        }


        function comfirmitem() {
            
        opt = {
            url : apiItem,
            method : 'post',
            data: {
                iduser : Number(user_data.id),
                title:  document.querySelector("#name_item").value,
                price: Number(document.querySelector("#price_item").value),
                quantity :  Number(document.querySelector("#qty_item").value),
                image: document.querySelector(".image_preview").getAttribute("src")
            }
        }
        
        axios(opt)
        .then( (data_res) => {
            console.log(data_res);

            if(data_res.status == 201)
                console.log(data_res.status);
        })
        .catch( (ex) => {
            console.log(ex);
        })
        .then(() => {
        loadDataItem();
        document.querySelector(".input").classList.remove('show');
        selectors.cartOverlay.classList.remove("show");
        initinput();

        })


        }


        loadDataItem();