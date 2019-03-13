var url = window.location.href;
if (url.includes("Math")){
    $("#Math").addClass("active");
} else if (url.includes("English")){
    $("#English").addClass("active");
} else if (url.includes("Physics")){
    $("#Physics").addClass("active");
} else if (url.includes("ComputerScience")){
    $("#ComputerScience").addClass("active");
} else if (url.includes("Psychology")){
    $("#Other").addClass("active");
} else if (url.includes("Art")){
    $("#Other").addClass("active");
} else{
    $("#AllPosts").addClass("active");
}