//const ip='10.0.2.15';
const ip='192.168.56.1'
const port='3000';

function postCategory () { 
    
    var name_category=document.getElementById("categorybox").value;
    var desc_category=document.getElementById("categorydescbox").value;;
    //console.log(name_category+"  "+desc_category);
    $.ajax({
        url : "http://"+ip+":"+port+"/HealthCare/category",
        type:'post',
        data:{
            category:name_category,
            desc:desc_category
        },//전송할 데이터 
        dataType:'json',
        success : function (data) {
            if(data=='duplicate'){
                alert('Duplicate category');
            }else if(data=='save'){
                alert('Category upload Success');
            }
            
            
        },
        failure:function(error){
            //console.log('2');
            alert(error);
        }
    });
    
}

function deleteCategory(){
    var e = document.getElementById("category_box_delete");
    var name_category = e.options[e.selectedIndex].value;
    //console.log(name_category+"  "+desc_category);
    $.ajax({
        url : "http://"+ip+":"+port+"/HealthCare/deleteCategory/"+name_category,
        type:'DELETE',
        data:{
            category:name_category
        },//전송할 데이터 
        dataType:'json',
        success : function (data) {
            if(data=='delete'){
                alert('Category deleted');
                location.reload();
            }
        },
        failure:function(error){
            //console.log('2');
            alert(error);
        }
    });
}

function getClusterName () { 
    $.ajax({
        url : "http://155.230.34.149:3000/spa/clusters/",
        type:'GET',
        dataType:'json',
        // 서버로 값을 성공적으로 넘기면 처리하는 코드부분 입니다.
        success : function (data) {
            // 변경된 태그 부분을 넘어온 index 값으로 찾은 뒤 on/off를 변경합니다.
            $("#cluster_box").find("option").remove();
            $("#cluster_box").append("<option value='' selected>--choice--</option>");
            let i;
            for(let i=0;i<data.length;i++)
            {
                $('#cluster_box').append('<option value='+data[i]+'>'+data[i]+'</option>')
            }
        },
        failure:function(error){
            alert(error.d);
        }
    });
    
}

function getScienceAppName () { 
    var e = document.getElementById("cluster_box");
    var cluster_name = e.options[e.selectedIndex].value;
    
    if(cluster_name=="")
    {
        alert('choose cluster');
    }
    else
    {
    $.ajax({
        url : "http://155.230.34.149:3000/spa/scienceAppName/"+cluster_name,
        type:'GET',
        dataType:'json',
        // 서버로 값을 성공적으로 넘기면 처리하는 코드부분 입니다.
        success : function (data) {
            // 변경된 태그 부분을 넘어온 index 값으로 찾은 뒤 on/off를 변경합니다.
             $("#scienceappname_box").find("option").remove();
             $("#scienceappname_box").append("<option value='' selected>--choice--</option>");
            let i;
            for(let i=0;i<data.length;i++)
            {
                $('#scienceappname_box').append('<option value='+data[i]+'>'+data[i]+'</option>')
            }
        },
        failure:function(error){
            alert(error.d);
        }
    });
    }
}

//ex http://155.230.34.149:3000/spa/clusters/EDISON-CFD/2D_Incomp_P/parameters_values?par[]=test1&par[]=test2&par[]=test3&var[]=var1&var[]=var2&var[]=var3
//requset result predict result
//router.get('/clusters/:cluster_name/:scienceAppName/parameters_values',function(req,res){

function getParameter () { 
    var a = document.getElementById("cluster_box");
    var cluster_name = a.options[a.selectedIndex].value;
    var e = document.getElementById("scienceappname_box");
    var scienceappname_name = e.options[e.selectedIndex].value;
    ///cluster/:cluster_name/:scienceAppName
    if(cluster_name=="" || scienceappname_name=="")
    {
        alert('choose cluster and scienceappname name');
    }
    else
    {
    $.ajax({
        url : "http://155.230.34.149:3000/spa/parameter/"+cluster_name+"/"+scienceappname_name,
        type:'GET',
        dataType:'json',
        // 서버로 값을 성공적으로 넘기면 처리하는 코드부분 입니다.
        success : function (data) {
            // 변경된 태그 부분을 넘어온 index 값으로 찾은 뒤 on/off를 변경합니다.
            $('#parameter_table > tbody').empty();
            let i;
            for(let i=0;i<data[0].length;i++)
            {   
                if(i==0) $('#parameter_table').append('<tr><td class="Parameter">'+data[0][i]+'</td><td><input class= "Value" type="text" name="box'+i+'"></td></tr>')
                else if(i==data[0].length-1) $('#parameter_table').append('<tr><td class="Parameter">'+data[0][i]+'</td><td><input class= "Value" type="text" name="box'+i+'"></td></tr>')
                else $('#parameter_table').append('<tr><td class="Parameter">'+data[0][i]+'</td><td><input class= "Value" type="text" name="box'+i+'"></td></tr>')
                //$('#parameter_table').append('<tr><td>'+data[0][i]+'</td><td><input type="text" name="box'+i+'"></td></tr>')
            }
        },
        failure:function(error){
            alert(error.d);
        }
    });
    }
}
//$('#next1').click(getScienceAppName());
function getResult() { 
    var a = document.getElementById("cluster_box");
    var cluster_name = a.options[a.selectedIndex].value;
    var e = document.getElementById("scienceappname_box");
    var scienceappname_name = e.options[e.selectedIndex].value;
    var p=document.getElementsByClassName("Parameter");
    var v=document.getElementsByClassName("Value");
    var parameters_values="?";
    var resut_label=document.getElementById('result');

    resut_label.innerText="Waiting...";
    for (let i=0;i<p.length;i++) {
        if(i==0) parameters_values=parameters_values.concat("par[]="+p[i].innerText);
        else parameters_values=parameters_values.concat("&par[]="+p[i].innerText);
        //console.log(parameters_values);
        //console.log(p[i].innerText);
    }
    for (let i=0;i<v.length;i++) {
        parameters_values=parameters_values.concat("&var[]="+v[i].value);
        //console.log(parameters_values);
        //console.log(v[i].value);
    }
    //console.log(parameters_values);
 
    ///cluster/:cluster_name/:scienceAppName
    $.ajax({
        url : "http://155.230.34.149:3000/spa/predictResult/"+cluster_name+"/"+scienceappname_name+"/parameters_values"+parameters_values,
        type:'GET',
        dataType:'json',
        
        // 서버로 값을 성공적으로 넘기면 처리하는 코드부분 입니다.
        success : function (data) {
            resut_label.innerText=data;
            //'#result').innerHTML="OK";
        },
        failure:function(error){
            alert(error.d);
        }
    });
}

function getResult_statistics() { 
    var a = document.getElementById("cluster_box");
    var cluster_name = a.options[a.selectedIndex].value;
    var e = document.getElementById("scienceappname_box");
    var scienceappname_name = e.options[e.selectedIndex].value;
    var r = document.getElementById("indexcount_box");
    var indexcount=r.options[r.selectedIndex].value;
    ///cluster/:cluster_name/:scienceAppName
    if(cluster_name=="" || scienceappname_name=="")
    {
        alert('choose cluster and scienceappname name');
    }
    else
    {
    $.ajax({
        ///statistics/clusters/:cluster_name/:scienceAppName
        url : "http://155.230.34.149:3000/spa/parameter/"+cluster_name+"/"+scienceappname_name,
        type:'GET',
        dataType:'json',
        // 서버로 값을 성공적으로 넘기면 처리하는 코드부분 입니다.
        success : function (data) {
            // 변경된 태그 부분을 넘어온 index 값으로 찾은 뒤 on/off를 변경합니다.
            $('#parameter_table > tbody').empty();
            let inner_html='';
            for(let i=0;i<data[0].length;i++)
            {   
                if(i==0) inner_html=inner_html.concat("<tr><td class=\"Rank\">Rank</td><td class=\"Parameter\">"+data[0][i]+"</td>");
                else if(i==data[0].length-1) {
                    //inner_html=inner_html.concat('<td class=\"Parameter\">'+data[0][i]+'</td><td class=\"Count\">Count</td></tr>');
                    inner_html=inner_html.concat('<td class=\"Parameter\">'+data[0][i]+'</td>');
                    $('#parameter_table').append(inner_html);
                }
                else inner_html=inner_html.concat("<td class=\"Parameter\">"+data[0][i]+"</td>");
                //$('#parameter_table').append('<tr><td>'+data[0][i]+'</td><td><input type="text" name="box'+i+'"></td></tr>')
            }

            $.ajax({
                url : "http://155.230.34.149:3000/spa/statisticsResult/"+cluster_name+"/"+scienceappname_name,
                type:'GET',
                dataType:'json',
        
                // 서버로 값을 성공적으로 넘기면 처리하는 코드부분 입니다.
                success : function (data) {
                    //$('#parameter_table > tbody').empty();
                    let inner_html='';

                    //console.dir(data);
                    //console.dir(data[0]);
                    //console.log(data[0].count);
                    //console.log(data[0]._id[0]);
                    ///for(let i=0;i<data.length;i++)
                    for(let i=0;i<indexcount;i++)
                    {   
                        for(let a=0;a<data[i]._id.length;a++){
                            //console.log(data[i]._id[a]);
                            inner_html=inner_html.concat('<td class=\"Parameter\">'+data[i]._id[a]+'</td>');
                        }
                        //console.log(inner_html);
                        $('#parameter_table').append("<tr><td class=\"Rank\">"+(i+1)+""+inner_html+"</td></tr>");
                        //$('#parameter_table').append("<tr><td class=\"Rank\">"+(i+1)+""+inner_html+"</td><td class=\"Count\">"+data[i].count+"</td></tr>");
                        inner_html='';
                    }
                },
                failure:function(error){
                    alert(error.d);
                }
            });

            
        },
        failure:function(error){
            alert(error.d);
        }
    });
    }
}
function reset_all_predict() { 
    $('#parameter_table > tbody').empty();
    $("#scienceappname_box").find("option").remove();
    $("#scienceappname_box").append("<option value='' selected>--choice--</option>");
    $("#cluster_box option:eq(0)").prop("selected",true);
    var resut_label=document.getElementById('result');
    resut_label.innerText="--Empty--";
    //$("#cluster_box").find("option").remove();
    //$("#cluster_box").append("<option value='' selected>--choice--</option>");

}

function reset_all() { 
    $('#parameter_table > tbody').empty();
    $("#scienceappname_box").find("option").remove();
    $("#scienceappname_box").append("<option value='' selected>--choice--</option>");
    $("#cluster_box option:eq(0)").prop("selected",true);
    //$("#cluster_box").find("option").remove();
    //$("#cluster_box").append("<option value='' selected>--choice--</option>");

}

function reset_parameter_table() { 
    $('#parameter_table > tbody').empty();
}

function reset_scienceappname_box(){
     $("#scienceappname_box").find("option").remove();
     $("#scienceappname_box").append("<option value='' selected>--choice--</option>");
}
