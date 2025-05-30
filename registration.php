<?php 
$showAlert=false;
$showError=false;
if($_SERVER["REQUEST_METHOD"]=="POST"){
    require 'C:\xampp\htdocs\Main Resume\partial\db_connect.php';
    $fname = $_POST['firstName'];
    $lname = $_POST["lastName"];
    $fullname = $fname . ' ' . $lname;
    // echo "Full Name: " . $fullname;
    $email= $_POST['email'];
    $password=$_POST['password'];
    $cpassword=$_POST['Confirmpassword'];
    $phon_no=$_POST['Phone_no'];

    $existSql="SELECT * FROM user_singup WHERE email='$email'";
    $result = mysqli_query($conn, $existSql);
    
   if(!$result){
        echo "Error: alert('error')" . mysqli_error($conn);
    }
    else{
        // echo 'code run';
    } 
    $num = mysqli_num_rows($result);
    if($num>0){
        $showError ="Username already exist";
        // echo '<script>alert("Username already exist")</script>';
    }
    else{
        if(($password == $cpassword)){
            $hash =password_hash($password,PASSWORD_DEFAULT );
            $sql = "INSERT INTO user_singup ( Name, email,password,Phone_no,date_time) VALUES ('$fullname','$email','$hash','$phon_no',current_timestamp())";
            $result = mysqli_query($conn, $sql);
            if($result){
                $showAlert=true;
                header("location:login.php");
            }
    
            else{
                $showError= 'Error: Password do not match';
                // echo "<script>alert('Error: Password do not match')</script>";
            }
    }
    }
    }
    
    ?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Registration - Real Estate</title>
    <link rel="stylesheet" href="style.css" />
    <link rel="stylesheet" href="media.css" />
    <link rel="stylesheet" href="register.css" />
</head>
<body>
    <div class="registration-container">
        <h2>Register</h2>
        <form id="registrationForm">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" required />

            <label for="email">Email</label>
            <input type="email" id="email" name="email" required />

            <label for="password">Password</label>
            <input type="password" id="password" name="password" required />

            <label for="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required />

            <button type="submit">Register</button>
        </form>
        <p>Already have an account? <a href="login.html">Login here</a></p>
        <p id="registrationMessage" class="message"></p>
    </div>
    <script src="register.js"></script>
</body>
</html>
