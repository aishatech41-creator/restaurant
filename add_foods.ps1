# Script to add food items with images

# First, login to get token
Write-Host "Logging in..."
$loginBody = @{
    email = "jackcojahk@gmail.com"
    password = "password"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:8000/api/login" -Method Post -Body $loginBody -ContentType "application/json"
    $token = $loginResponse.token
    Write-Host "Login successful!" -ForegroundColor Green
} catch {
    Write-Host "Login failed. Creating test admin user..." -ForegroundColor Yellow
    
    # Register a new admin user
    $registerBody = @{
        name = "Admin User"
        email = "admin@restaurant.com"
        password = "admin123"
        password_confirmation = "admin123"
    } | ConvertTo-Json
    
    try {
        $registerResponse = Invoke-RestMethod -Uri "http://localhost:8000/api/register" -Method Post -Body $registerBody -ContentType "application/json"
        $token = $registerResponse.token
        Write-Host "Admin user created and logged in!" -ForegroundColor Green
    } catch {
        Write-Host "Failed to create admin user." -ForegroundColor Red
        Write-Host $_.Exception.Message
        exit
    }
}

$images = @(
    @{file="c2.png"; title="Chicken Curry"; category="curry"; price="4500"; calories="350"; description="Delicious chicken curry with aromatic spices"},
    @{file="c3.png"; title="Chicken Tikka"; category="chicken"; price="5500"; calories="400"; description="Grilled chicken tikka marinated in special spices"},
    @{file="c4.png"; title="Chicken Wings"; category="chicken"; price="3500"; calories="320"; description="Crispy chicken wings with special sauce"},
    @{file="d1.png"; title="Chocolate Dessert"; category="dessert"; price="2500"; calories="450"; description="Rich chocolate dessert with cream topping"},
    @{file="d2.png"; title="Ice Cream Sundae"; category="dessert"; price="2000"; calories="300"; description="Classic ice cream sundae with toppings"},
    @{file="d3.png"; title="Fruit Tart"; category="dessert"; price="2800"; calories="350"; description="Fresh fruit tart with custard"},
    @{file="f1.png"; title="Fresh Fruit Salad"; category="fruits"; price="1500"; calories="120"; description="Mixed fresh fruits salad"},
    @{file="f2.png"; title="Strawberry Delight"; category="fruits"; price="1800"; calories="150"; description="Fresh strawberries with cream"},
    @{file="f3.png"; title="Tropical Mix"; category="fruits"; price="2000"; calories="180"; description="Tropical fruits mix"},
    @{file="i1.png"; title="Vanilla Ice Cream"; category="icecream"; price="1200"; calories="250"; description="Creamy vanilla ice cream"},
    @{file="i2.png"; title="Chocolate Ice Cream"; category="icecream"; price="1200"; calories="280"; description="Rich chocolate ice cream"},
    @{file="i3.png"; title="Strawberry Ice Cream"; category="icecream"; price="1200"; calories="260"; description="Fresh strawberry ice cream"},
    @{file="r1.png"; title="Fried Rice"; category="rice"; price="3500"; calories="400"; description="Special fried rice with vegetables"},
    @{file="r2.png"; title="Biryani Rice"; category="rice"; price="4500"; calories="450"; description="Aromatic biryani rice with spices"},
    @{file="r3.png"; title="Jollof Rice"; category="rice"; price="4000"; calories="420"; description="Traditional jollof rice"}
)

$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

Write-Host ""
Write-Host "Starting to add food items..." -ForegroundColor Cyan

foreach ($item in $images) {
    Copy-Item "src/img/$($item.file)" -Destination "backend/storage/app/public/uploads/$($item.file)" -Force
    
    $imageUrl = "http://localhost:8000/storage/uploads/$($item.file)"
    
    $body = @{
        title = $item.title
        imageURL = $imageUrl
        calories = $item.calories
        description = $item.description
        price = $item.price
        category = $item.category
        qty = 10
    } | ConvertTo-Json
    
    Write-Host "Adding: $($item.title)..."
    
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:8000/api/food" -Method Post -Body $body -Headers $headers
        Write-Host "  ✓ Added successfully!" -ForegroundColor Green
    } catch {
        Write-Host "  ✗ Failed to add" -ForegroundColor Red
        Write-Host "  Error: $($_.Exception.Message)"
    }
}

Write-Host ""
Write-Host "Done! All food items have been processed." -ForegroundColor Cyan
