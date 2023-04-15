/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
        var jpdbBaseURL = "http://api.login2explore.com:5577";
        var jpdbIRL = "/api/irl";
        var jpdbIML = "api/iml";
        var studentDBName = "SCHOOL-DB";
        var studentRelationName = "STUDENT-TABLE";
        var connToken = "90932816|-31949281552952102|90948221";

        $("#rollno").focus();

        function saveRecNo2LS(jsonObj) {
            var lvData = JSON.parse(jsonObj.data);
            localStorage.setItem('recno', lvData.rec_no);
        }
        function getEmpIdAsJsonObj() {
            var rollno = $('#rollno').val();
            var jsonStr = {
                id: rollno
            };
            return JSON.stringify(jsonStr);
        }
        function fillData(jsonObj) {
            saveRecNo2LS(jsonObj);
            var record = JSON.parse(jsonObj.data).record;
            $("#studentName").val(record.name);
            $("#class").val(record.salary);
            $("#dob").val(record.hra);
            $("#address").val(record.da);
            $("#enrolldate").val(record.deduction);
        }
        function resetForm() {
            $('#rollno').val("");
            $('#studentName').val("");
            $('#class').val("");
            $('#dob').val("");
            $('#address').val("");
            $('#enrolldate').val("");
            $('#rollno').prop('disabled', false);
            $('#save').prop('disabled', true);
            $('#change').prop('disabled', true);
            $('#reset').prop('disabled', true);
            $('#rollno').focus();
        }
        function validateData() {
            var rollno, studentName, Class, dob, address, enrolldate;
            rollno = $('rollno').val();
            studentName = $('studentName').val();
            Class = $('class').val();
            dob = $('dob').val();
            address = $('address').val();
            enrooldate = $('enrolldate').val();

            if (rollno === " ") {
                alert("Roll-No is missing");
                $('rollno').focus();
                return "";
            }
            if (studentName === " ") {
                alert("Student Name missing");
                $('studentName').focus();
                return "";
            }
            if (Class === " ") {
                alert("Class is  missing");
                $('class').focus();
                return "";
            }
            if (dob === " ") {
                alert("DOB missing");
                $('dob').focus();
                return "";
            }
            if (address === " ") {
                alert("Address is missing");
                $('address').focus();
                return "";
            }
            if (enrolldate === " ") {
                alert("Enrollment Date is missing");
                $('enrolldate').focus();
                return "";
            }

            var jsonStrObj = {
                id: rollno,
                name: studentName,
                salary: Class,
                hra: dob,
                da: address,
                deduction: enrolldate
            };
            return JSON.stringify(jsonStrObj);
        }

        function getEmp() {
            var empidJsonObj = getEmpIdAsJsonObj();
            var getRequest = createGET_BY_Request(connToken, studentDBName, studentRelationName, empidJsonObj);
            jQuery.ajaxSetup({ async: false });
            var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
            jQuery.ajaxSetup({ async: true });
            if (resJsonObj.status === 400) {
                $("#save").prop("disabled", false);
                $("#reset").prop("disabled", false);
                $("#studentName").focus();
            }
            else if (resJsonObj.status === 200) {
                $("#rollno").prop("disabled", true);
                fillData(resJsonObj);
                $("#change").prop("disabled".false);
                $("#reset").prop("disabled", false);
                $("#studentName").focus();
            }
        }
        function saveData() {
            var jsonStrObj = validateData();
            if (jsonStrObj === " ") {
                return;
            }
            var putRequest = createPutRequest(connToken, jsonStrObj, studentDBName, studentRelationName);
            jQuery.ajaxSetup({ async: false });
            var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
            jQuery.ajaxSetup({ async: true });
            resetForm();
            $('#rollno').focus();
        }

        function changeData() {
            $('#change').prop('disabled', true);
            jsonChg = validateData();
            var updateRequest = createUPDATERecordRequest(connToken, jsonChg, studentDBName, studentRelationName, localStorage.getItem('recno'));
            jQuery.ajaxSetup({ async: false });
            var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
            jQuery.ajaxSetup({ async: true });
//            console.log(resJsonObj);
            resetForm();
            $('#rollno').focus();
        }

