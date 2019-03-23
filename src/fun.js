//const ip='10.0.2.15';
const ip='192.168.56.1'
const port='3000';


/*exercise page function*/

function updateExercise () { 
    var file = document.getElementById('file1');
    var file_value=document.getElementById('file1').value;
    var pathHeader = file_value.lastIndexOf("\\");
    var pathMiddle = file_value.lastIndexOf(".");
    var pathEnd = file_value.length;

    fileName = file_value.substring(pathHeader+1, pathMiddle);
    extName = file_value.substring(pathMiddle+1, pathEnd);
    allFilename = fileName+"."+extName;

    if (!file){
        alert('Thumbnail Image Upload Please');
        return; // 파일이 없는 경우 빠져나오기
    } 
    var filedata = new FormData(); // FormData 인스턴스 생성
    filedata.append('file1', $("input[name=file1]")[0].files[0]);

    var e = document.getElementById("exercise_box_update");
    var name_exercise_origin = e.options[e.selectedIndex].value;
    var name_exercise=document.getElementById("exercisebox_update").value;
    var desc_exercise=document.getElementById("exercisedescbox_update").value;
    //console.log(name_exercise+"  "+desc_exercise);
    if(name_exercise==""){
        alert('Please input Exercise Name');
    }else{
        $.ajax({
        url : "http://"+ip+":"+port+"/HealthCare/exercise/update",
        type:'POST',
        data:{
            exercise_origin:name_exercise_origin,
            exercise:name_exercise,
            desc:desc_exercise,
            image_name:allFilename
        },//전송할 데이터 
        dataType:'json',
        success : function (data) {
            if(data=='update'){
                 $.ajax({
                    url: "http://"+ip+":"+port+"/HealthCare/upload1",
                            enctype:'multipart/form-data',
                            processData: false,
                            contentType: false,
                            data: filedata,
                            type: 'POST',
                            success: function(result){
                                console.log(result);
                                console.log(allFilename);
                                alert('Exercise Update Success');
                                location.reload();
                            },
                            failure:function(error){
                                console.log(allFilename);
                                alert(error);

                            }

                    });
            }
        },
        failure:function(error){
            //console.log('2');
            alert(error);
        }
    });
    }   
}

function getExerciseInfo(){

    var e = document.getElementById("exercise_box_update");
    var name_exercise = e.options[e.selectedIndex].value;
    $.ajax({
        url : "http://"+ip+":"+port+"/HealthCare/exercise/info",
        type:'POST',
        data:{
            exercise:name_exercise
        },
        dataType:'json',
        success : function (data) {
            $('#exercisebox_update').empty();
            $('#exercisedescbox_update').empty();
            $("#exercisebox_update").val(data.exercise);
            $('#exercisedescbox_update').val(data.exercise_desc);
            image_title.innerText=data.image_title;
            movie_title.innerText=data.movie_title;
            $('#blah1').attr("src","http://"+ip+":"+port+"/HealthCare/image/"+data.image_title)

            // $.ajax({
            //     url : "http://"+ip+":"+port+"/HealthCare/image/"+data.image_title,
            //     type:'GET',
            //     dataType:'json',
            //     success : function (data) {
            //         console.log(data);
            //         $('#blah1').html(data);
            //     },
            //     failure:function(error){
            //         //console.log('2');
            //         alert(error);
            //     }
            // });
        },
        failure:function(error){
            //console.log('2');
            alert(error);
        }
    });
}

function getExercise_update(){

    var e = document.getElementById("category_box_update");
    var name_category = e.options[e.selectedIndex].value;
    $.ajax({
        url : "http://"+ip+":"+port+"/HealthCare/exerciselist/"+name_category,
        type:'GET',
        data:{
            category:name_category
        },
        dataType:'json',
       success : function (data) {
             $("#exercise_box_update").find("option").remove();
             $("#exercise_box_update").append("<option value='' selected>--choice--</option>");
            let i;
            for(let i=0;i<data.length;i++)
            {
                $('#exercise_box_update').append('<option value='+data[i]+'>'+data[i]+'</option>')
            }
        },
        failure:function(error){
            //console.log('2');
            alert(error);
        }
    });
}

function getExercise(){

    var e = document.getElementById("category_box_delete");
    var name_category = e.options[e.selectedIndex].value;
    $.ajax({
        url : "http://"+ip+":"+port+"/HealthCare/exerciselist/"+name_category,
        type:'GET',
        data:{
            category:name_category
        },
        dataType:'json',
       success : function (data) {
             $("#exercise_box_delete").find("option").remove();
             $("#exercise_box_delete").append("<option value='' selected>--choice--</option>");
            let i;
            for(let i=0;i<data.length;i++)
            {
                $('#exercise_box_delete').append('<option value='+data[i]+'>'+data[i]+'</option>')
            }
        },
        failure:function(error){
            //console.log('2');
            alert(error);
        }
    });
}

function postExercise () { 
    var file = document.getElementById('file');
    var file_value=document.getElementById('file').value;
    var pathHeader = file_value.lastIndexOf("\\");
    var pathMiddle = file_value.lastIndexOf(".");
    var pathEnd = file_value.length;

    fileName = file_value.substring(pathHeader+1, pathMiddle);
    extName = file_value.substring(pathMiddle+1, pathEnd);
    allFilename = fileName+"."+extName;

    if (!file){
        alert('Thumbnail Image Upload Please');
        return; // 파일이 없는 경우 빠져나오기
    } 
    var filedata = new FormData(); // FormData 인스턴스 생성
    filedata.append('file', $("input[name=file]")[0].files[0]);

    var e = document.getElementById("category_box");
    var name_category = e.options[e.selectedIndex].value;
    var name_exercise=document.getElementById("exercisebox").value;
    var desc_exercise=document.getElementById("exercisedescbox").value;
    //console.log(name_exercise+"  "+desc_exercise);
    if(name_exercise==""){
        alert('Please input Exercise Name');
    }else{
        $.ajax({
        url : "http://"+ip+":"+port+"/HealthCare/exercise",
        type:'POST',
        data:{
            category:name_category,
            exercise:name_exercise,
            desc:desc_exercise,
            image_name:allFilename
        },//전송할 데이터 
        dataType:'json',
        success : function (data) {
            if(data=='duplicate'){
                alert('Duplicate category');
            }else if(data=='save'){
                 $.ajax({
                    url: "http://"+ip+":"+port+"/HealthCare/upload",
                            enctype:'multipart/form-data',
                            processData: false,
                            contentType: false,
                            data: filedata,
                            type: 'POST',
                            success: function(result){
                                console.log(result);
                                console.log(allFilename);
                                alert('Category upload Success');
                                location.reload();
                            },
                            failure:function(error){
                                console.log(allFilename);
                                alert(error);

                            }

                    });

            }
        },
        failure:function(error){
            //console.log('2');
            alert(error);
        }
    });
    }   
}

function deleteExercise(){
    var e = document.getElementById("exercise_box_delete");
    var name_exercise = e.options[e.selectedIndex].value;
    //console.log(name_category+"  "+desc_category);
    $.ajax({
        url : "http://"+ip+":"+port+"/HealthCare/deleteExercise/"+name_exercise,
        type:'DELETE',
        data:{
            exercisename:name_exercise
        },//전송할 데이터 
        dataType:'json',
        success : function (data) {
            if(data=='delete'){
                alert('Exercise deleted');
                location.reload();
            }
        },
        failure:function(error){
            //console.log('2');
            alert(error);
        }
    });
}

function reset_exercise_box_update(){
     $("#exercise_box_update").find("option").remove();
     $("#exercise_box_update").append("<option value='' selected>--choice--</option>");
}

function reset_exercise_box(){
     $("#exercise_box_delete").find("option").remove();
     $("#exercise_box_delete").append("<option value='' selected>--choice--</option>");
}
/*category page function*/
function getCategory(){

    var e = document.getElementById("category_box_update");
    var name_category = e.options[e.selectedIndex].value;
    $.ajax({
        url : "http://"+ip+":"+port+"/HealthCare/category/info",
        type:'POST',
        data:{
            category:name_category
        },
        dataType:'json',
        success : function (data) {
            $('#categorybox_update').empty();
            $('#categorydescbox_update').empty();
            $("#categorybox_update").val(data.category);
            $('#categorydescbox_update').val(data.category_desc);
        },
        failure:function(error){
            //console.log('2');
            alert(error);
        }
    });
}

function updateCategory(){
    var e = document.getElementById("category_box_update");
    var orign_category = e.options[e.selectedIndex].value;
    var name_category=document.getElementById("categorybox_update").value;
    var desc_category=document.getElementById("categorydescbox_update").value;;
    //console.log(name_category+"  "+desc_category);
    $.ajax({
        url : "http://"+ip+":"+port+"/HealthCare/category/update",
        type:'POST',
        data:{
            category_origin:orign_category,
            category:name_category,
            desc:desc_category
        },//전송할 데이터 
        dataType:'json',
        success : function (data) {
            if(data=='update'){
                alert('Update category');
                location.reload();
            }else if(data=='emtpy'){
                alert('Update failed');
            }
            
        },
        failure:function(error){
            //console.log('2');
            alert(error);
        }
    });
}

function postCategory () { 
    
    var name_category=document.getElementById("categorybox").value;
    var desc_category=document.getElementById("categorydescbox").value;;
    //console.log(name_category+"  "+desc_category);
    if(name_category==""){
        alert('Please input Category Name');
    }else{
        $.ajax({
        url : "http://"+ip+":"+port+"/HealthCare/category",
        type:'POST',
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
                location.reload();
            }
            
            
        },
        failure:function(error){
            //console.log('2');
            alert(error);
        }
    });
    }   
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
