<?php
/**
 * Nexus Creative - Customer Registration & Inquiry Notification Endpoint
 */

// Enable CORS if needed
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method Not Allowed"]);
    exit();
}

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data) {
    $data = $_POST;
}

$name     = isset($data['name']) ? trim(strip_tags($data['name'])) : '';
$email    = isset($data['email']) ? filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL) : '';
$phone    = isset($data['phone']) ? trim(strip_tags($data['phone'])) : '';
$category = isset($data['category']) ? trim(strip_tags($data['category'])) : '';
$service  = isset($data['service']) ? trim(strip_tags($data['service'])) : '';
$message  = isset($data['message']) ? trim(strip_tags($data['message'])) : '';

if (empty($name) || empty($email) || empty($phone)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Please fill in all required fields (Name, Email, Mobile)."]);
    exit();
}

$to = "haridass@nexuscreative.site, info@nexuscreative.site, nexuscreative.site@gmail.com";
$subject = "🔥 New Customer Inquiry: {$name} - {$service}";

$email_content = "
<html>
<head>
  <title>New Customer Registration & Inquiry</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; }
    .header { background: #0066FF; color: white; padding: 15px; border-radius: 8px 8px 0 0; text-align: center; }
    .table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    .table td { padding: 10px; border-bottom: 1px solid #eee; }
    .table td.label { font-weight: bold; width: 35%; color: #555; }
    .footer { font-size: 11px; color: #888; text-align: center; margin-top: 20px; }
  </style>
</head>
<body>
  <div class='container'>
    <div class='header'>
      <h2>Nexus Creative - New Inquiry Alert</h2>
    </div>
    <table class='table'>
      <tr><td class='label'>Customer Name:</td><td>{$name}</td></tr>
      <tr><td class='label'>Email Address:</td><td><a href='mailto:{$email}'>{$email}</a></td></tr>
      <tr><td class='label'>Mobile Number:</td><td><a href='tel:{$phone}'>{$phone}</a></td></tr>
      <tr><td class='label'>Category:</td><td>{$category}</td></tr>
      <tr><td class='label'>Selected Service:</td><td>{$service}</td></tr>
      <tr><td class='label'>Project Brief:</td><td>" . nl2br($message) . "</td></tr>
      <tr><td class='label'>Received Time:</td><td>" . date("Y-m-d H:i:s") . "</td></tr>
    </table>
    <div class='footer'>
      This automated alert was generated from nexuscreative.site contact portal.
    </div>
  </div>
</body>
</html>
";

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: Nexus Creative Portal <no-reply@nexuscreative.site>" . "\r\n";
$headers .= "Reply-To: {$name} <{$email}>" . "\r\n";

$mail_sent = false;

// If inside WordPress environment
if (function_exists('wp_mail')) {
    $mail_sent = wp_mail($to, $subject, $email_content, $headers);
} else {
    $mail_sent = @mail($to, $subject, $email_content, $headers);
}

// Log lead locally on server if possible
$lead_log = [
    "timestamp" => date("c"),
    "name" => $name,
    "email" => $email,
    "phone" => $phone,
    "category" => $category,
    "service" => $service,
    "message" => $message,
    "ip" => $_SERVER['REMOTE_ADDR'] ?? 'Unknown'
];

@file_put_contents(__DIR__ . '/leads_log.json', json_encode($lead_log) . PHP_EOL, FILE_APPEND);

echo json_encode([
    "success" => true,
    "message" => "Notification dispatched successfully.",
    "email_sent" => $mail_sent
]);
