let students = [];
let currentId = null;
const getStudents = () => {
  $.ajax({
    url: "https://studentcrudforlesson.herokuapp.com/api/student/get",
    method: "get",
    success: function (javob) {
      students = javob;
      console.log(javob);
      chiz();
    },
    error: function (error) {
      console.log(javob);
      console.log(error);
      $("h2").html("Xatolik");
    },
  });
};
getStudents();
$(".addStudent").on("click", function () {
  let firstname = $("#firstName").val();
  let lastname = $("#lastName").val();
  let username = $("#userName").val();
  let phoneNumber = $("#phoneNumber").val();
  $.ajax({
    url: "https://studentcrudforlesson.herokuapp.com/api/student/add",
    method: "post",
    data: JSON.stringify({
      firstname,
      lastname,
      username,
      phoneNumber,
    }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response) {
      getStudents();
      console.log(response);
    },
    error: function (err) {
      getStudents();
      console.log(err);
    },
  });
  $("#firstName").val("");
  $("#lastName").val("");
  $("#userName").val("");
  $("#phoneNumber").val("");
});

const chiz = () => {
  let myTexts = "";
  students.forEach((student, index) => {
    myTexts += `<tr>
    <th scope="row">${index + 1}</th>
    <td>${student.firstname}</td>
    <td>${student.lastname}</td>
    <td>${student.username}</td>
    <td>${student.phoneNumber}</td>
    <td class="text-center">
      <img onclick="editStudent(${student.id})" class="deleteImage" src="pictures/edit.png" alt="edit">
      <img onclick="deleteStudent(${student.id})" class="deleteImage" src="pictures/delete.png" alt="delete">
    </td>
    </tr>`;
  });
  $(".tableBody").html(myTexts);
};
const deleteStudent = id => {
  console.log(id);
  $.ajax({
    url: `https://studentcrudforlesson.herokuapp.com/api/student/delete/${id}`,
    method: "delete",
    success: function (response) {
      console.log(response);
      getStudents();
    },
    error: function (err) {
      console.log(err);
    },
  });
};
const editStudent = id => {
  let student = students.find(item => item.id === id);
  currentId = id;
  console.log(students);
  console.log(id, student);
  $("#firstName").val(student.firstname);
  $("#lastName").val(student.lastname);
  $("#userName").val(student.username);
  $("#phoneNumber").val(student.phoneNumber);
  $(".addStudent").hide();
  $(".editStudent").show();
};
$(".editStudent").on("click", function () {
  let firstname = $("#firstName").val();
  let lastname = $("#lastName").val();
  let username = $("#userName").val();
  let phoneNumber = $("#phoneNumber").val();
  $.ajax({
    url: `https://studentcrudforlesson.herokuapp.com/api/student/update/${currentId}`,
    method: "post",
    data: JSON.stringify({
      firstname,
      lastname,
      username,
      phoneNumber,
    }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (res) {
      console.log(res);
      getStudents();
    },
    error: function (err) {
      getStudents();
      console.log(err);
    },
  });
  $("#firstName").val("");
  $("#lastName").val("");
  $("#userName").val("");
  $("#phoneNumber").val("");
  $(".addStudent").show();
  $(".editStudent").hide();
});
