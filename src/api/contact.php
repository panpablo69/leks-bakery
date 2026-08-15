<?php
// API Endpoint dla Formularza Kontaktowego i B2B Leks Bakery
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(455);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit();
}

// Odczyt surowego JSON lub Form Data
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$botcheck = isset($input['botcheck']) ? trim($input['botcheck']) : '';
if (!empty($botcheck)) {
    // Bot detected
    echo json_encode(['success' => true, 'message' => 'OK']);
    exit();
}

$name = isset($input['name']) ? trim($input['name']) : '';
$email = isset($input['email']) ? trim($input['email']) : '';
$subject = isset($input['subject']) ? trim($input['subject']) : 'Wiadomość ze strony Leks';
$message = isset($input['message']) ? trim($input['message']) : '';
$company = isset($input['company']) ? trim($input['company']) : '';
$phone = isset($input['phone']) ? trim($input['phone']) : '';
$from_name = isset($input['from_name']) ? trim($input['from_name']) : 'Formularz Leks Bakery';

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Wypełnij wszystkie wymagane pola (Imię, E-mail, Treść).']);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Nieprawidłowy adres e-mail.']);
    exit();
}

$target_email = isset($input['target_email']) ? trim($input['target_email']) : '';
if (!empty($target_email) && filter_var($target_email, FILTER_VALIDATE_EMAIL)) {
    $to = $target_email;
} else if (stripos($from_name, 'Rekrutacja') !== false || stripos($subject, 'Aplikacja') !== false || stripos($subject, 'Rekrutacja') !== false) {
    $to = 'rekrutacja@leks.com.pl';
} else if (stripos($from_name, 'B2B') !== false || stripos($subject, 'B2B') !== false) {
    $to = 'b2b@leks.com.pl';
} else {
    $to = 'biuro@leks.com.pl';
}

$email_subject = "=?UTF-8?B?" . base64_encode("[Leks Website] " . $subject) . "?=";

$email_content = "Otrzymano nową wiadomość z formularza na stronie LEKS:\n\n";
$email_content .= "Źródło: " . htmlspecialchars($from_name) . "\n";
$email_content .= "Imię i nazwisko: " . htmlspecialchars($name) . "\n";
$email_content .= "Adres e-mail: " . htmlspecialchars($email) . "\n";
if (!empty($company)) {
    $email_content .= "Firma: " . htmlspecialchars($company) . "\n";
}
if (!empty($phone)) {
    $email_content .= "Telefon: " . htmlspecialchars($phone) . "\n";
}
$email_content .= "Temat: " . htmlspecialchars($subject) . "\n\n";
$email_content .= "Treść wiadomości:\n";
$email_content .= "--------------------------------------------------\n";
$email_content .= $message . "\n";
$email_content .= "--------------------------------------------------\n";
$email_content .= "Adres IP nadawcy: " . ($_SERVER['REMOTE_ADDR'] ?? 'nieznany') . "\n";
$email_content .= "Data: " . date('Y-m-d H:i:s') . "\n";

$from_email = 'biuro@leks.com.pl';

$headers = [];
$headers[] = "From: Leks Website <{$from_email}>";
$headers[] = "Reply-To: {$name} <{$email}>";
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/plain; charset=UTF-8";
$headers[] = "X-Mailer: PHP/" . phpversion();

// Pass envelope sender -f parameter to prevent SEOHOST mail rejection
$sent = @mail($to, $email_subject, $email_content, implode("\r\n", $headers), "-f {$from_email}");

if (!$sent) {
    // Fallback try without fifth parameter if server restricts -f
    $sent = @mail($to, $email_subject, $email_content, implode("\r\n", $headers));
}

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Wiadomość została wysłana!']);
} else {
    // Log error for debugging
    error_log("Leks contact form mail() failed to send to $to from $email");
    echo json_encode(['success' => false, 'error' => 'Błąd wysyłania przez serwer mailowy. Prosimy o kontakt bezpośredni na biuro@leks.com.pl']);
}
