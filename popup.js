window.onload = function(){

    var box_1_prompt = document.querySelector("#main .box-1 .prompt");

    var url_base = "http://photo.weibo.com/",
    url_detail = "photos/get_all",
    url = url_base + url_detail,

    //lu
    //配图
    //经测试，count至少为5
    data = "uid=2977896725&album_id=3505873260043239&count=30&page=1&type=3";
    //touxiang
    //data = "uid=2977896725&album_id=3505873260043239&count=4&page=1&type=3";
    
    //yu
    //data = "uid=1284198813&album_id=3522164825851421&count=3&page=1&type=3";

    function box1Load(){

        console.log(this);

        function doLoadBack(back_data){
            var json_obj = JSON.parse(back_data),
                photo_list = json_obj.data.photo_list,
                box_html = "";

            console.log(json_obj.data.total);
            console.log(photo_list.length);

            photo_list.forEach(function(item){
                var img_url = "http://ww1.sinaimg.cn/bmiddle/" + item.pic_name,
                    date = new Date(item.timestamp * 1000).toString(),

                    piece_html = 
                        '<section class="piece">' +
                            '<div class="photo">' +
                                '<img src="' + img_url +'" alt="test">' +
                            '</div>' +
                            '<div class="text">' +
                                '<div class="meta"><time datetime="' + date + '">' + date.substr(4, 6) + '</time><span class="source">' + item.source + '</span></div>' +
                                '<div class="desc">' + item.caption +'</div>' +
                            '</div>' +
                        '</section>';

                box_html += piece_html;
                //console.log(img);
            });

            console.log(this);
            document.querySelector("#main .box-1 .prompt").insertAdjacentHTML("beforebegin", box_html);
        }

        ajaxGet(url, data, doLoadBack);

    }

    box1Load();
    box_1_prompt.onclick = box1Load;




    //lib
    function ajaxGet(url, data, callback){
        var xhr = new XMLHttpRequest();

        url = url + "?" + data;

        xhr.open("get", url, true);
        xhr.send(null);

        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if((xhr.status>=200 && xhr.status<300) || xhr.status == 304){
                    callback(xhr.responseText);
                }else{
                    console.log("failed: " + xhr.status);
                }
            }
        };
    }
};