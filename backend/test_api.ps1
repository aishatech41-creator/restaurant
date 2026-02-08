$baseUrl = "http://localhost:8000/api"
$email = "testscript_$(Get-Random)@example.com"
$password = "password"

function Test-Endpoint {
    param (
        [string]$Method,
        [string]$Uri,
        [hashtable]$Body = @{},
        [string]$Token = $null,
        [string]$Description
    )

    Write-Host "Testing: $Description ($Method $Uri)..." -NoNewline
    
    $headers = @{ "Content-Type" = "application/json"; "Accept" = "application/json" }
    if ($Token) { $headers["Authorization"] = "Bearer $Token" }

    try {
        $params = @{
            Uri = "$baseUrl$Uri"
            Method = $Method
            Headers = $headers
        }
        if ($Body.Count -gt 0) { $params["Body"] = ($Body | ConvertTo-Json) }

        $response = Invoke-RestMethod @params
        Write-Host " [OK] - Status: Success" -ForegroundColor Green
        return $response
    } catch {
        Write-Host " [FAILED]" -ForegroundColor Red
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Yellow
        if ($_.Exception.Response) {
             $reader = New-Object System.IO.StreamReader $_.Exception.Response.GetResponseStream()
             Write-Host "Response: $($reader.ReadToEnd())" -ForegroundColor Yellow
        }
        return $null
    }
}

# 1. Register
$registerData = @{
    name = "Test User"
    email = $email
    password = $password
    password_confirmation = $password
}
$auth = Test-Endpoint -Method "Post" -Uri "/register" -Body $registerData -Description "User Registration"

if ($auth -and $auth.token) {
    $token = $auth.token
    Write-Host "Obtained Token: $token" -ForegroundColor Cyan

    # 2. Login
    $loginData = @{ email = $email; password = $password }
    Test-Endpoint -Method "Post" -Uri "/login" -Body $loginData -Description "User Login"

    # 3. Get Food Items (Public)
    Test-Endpoint -Method "Get" -Uri "/food" -Description "Fetch All Food"

    # 4. Add Food Item (Protected, assumes implicit admin or just testing auth)
    # Note: Backend might not check admin role yet, just auth
    $foodData = @{
        title = "Test Burger"
        imageURL = "http://example.com/burger.jpg"
        calories = "500"
        description = "Delicious test burger"
        price = "10.00"
        category = "fastfood"
        qty = "10"
    }
    $newFood = Test-Endpoint -Method "Post" -Uri "/food" -Body $foodData -Token $token -Description "Add Food Item"

    # 5. Add to Cart (Protected)
    if ($newFood -and $newFood.data.id) {
        $fid = $newFood.data.id
        
        $cartData = @{
            food_id = $fid
            qty = 1
        }
        Test-Endpoint -Method "Post" -Uri "/cart" -Body $cartData -Token $token -Description "Add to Cart"
        
        # 6. Get Cart (Protected)
        $cartResponse = Test-Endpoint -Method "Get" -Uri "/cart" -Token $token -Description "Fetch Cart"
        
        # 7. Remove from Cart using the cart Item ID (not food id)
        if ($cartResponse -and $cartResponse.length -gt 0) {
             # The cart response structure depends on controller. Assuming list of items.
             # We need the ID of the cart item itself.
             # Let's assume the first item is the one we just added.
             $cartItemId = $cartResponse[0].id
             Test-Endpoint -Method "Delete" -Uri "/cart/$cartItemId" -Token $token -Description "Remove from Cart"
        }

        # 8. Delete Food Item (Protected)
        Test-Endpoint -Method "Delete" -Uri "/food/$fid" -Token $token -Description "Delete Food Item"
    }

    # 9. Logout
    Test-Endpoint -Method "Post" -Uri "/logout" -Token $token -Description "User Logout"

} else {
    Write-Host "Registration failed, stopping tests." -ForegroundColor Red
}
