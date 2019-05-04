const ip='122.39.157.16';
const port='21003';
//const ip='192.168.0.100';
//const port='80';
/*localvm settings*/
//const ip='192.168.56.1'
//const ip='127.0.0.1';



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
