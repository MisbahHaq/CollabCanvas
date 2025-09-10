<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculator</title>
</head>

<body>
    <form method="post">
        <input type="number" name="numb1" required placeholder="Enter first number"><br>
        <input type="number" name="numb2" required placeholder="Enter second number"><br>
        <input type="text" name="opr" required placeholder="Enter operator (+, -, *, /)"><br><br>
        <input type="submit" value="Calculate">
    </form>

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get input values
        $numb1 = $_POST['numb1'];
        $numb2 = $_POST['numb2'];
        $opr = $_POST['opr'];

        // Perform the calculation based on the operator
        switch ($opr) {
            case '+':
                $result = $numb1 + $numb2;
                break;
            case '-':
                $result = $numb1 - $numb2;
                break;
            case '*':
                $result = $numb1 * $numb2;
                break;
            case '/':
                if ($numb2 != 0) {
                    $result = $numb1 / $numb2;
                } else {
                    $result = "Error: Division by zero!";
                }
                break;
            default:
                $result = "Invalid operator. Please use +, -, *, or /.";
                break;
        }

        // Display the result
        echo "<h3>Result: " . $result . "</h3>";
    }
    ?>

</body>

</html>