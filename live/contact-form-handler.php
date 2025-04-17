<?php
header('Content-Type: application/json');

// Configuration
$to_email = "rthomas@pivotmkg.com"; // Replace with your email
$subject = "New Contact Form Submission";

// Get form data
$name = $_POST['nameInput'];
$contact_number = $_POST['contactNumberInput'];
$email = $_POST['emailAddressInput'];
$subject_input = $_POST['subjectInput'];
$message = $_POST['yourMessage'];

// Validate required fields
if (empty($name) || empty($contact_number) || empty($email) || empty($subject_input) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

// Prepare email message
$message_body = "New contact form submission received from Chemo Test Laboratory:\n\n";
$message_body .= "Name: $name\n";
$message_body .= "Contact Number: $contact_number\n";
$message_body .= "Email: $email\n";
$message_body .= "Subject: $subject_input\n";
$message_body .= "Message: $message\n";

// Set up email headers
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send email
if (mail($to_email, $subject, $message_body, $headers)) {
    // Redirect to thank you page
    header('Location: thank-you.html');
    exit;
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to send message. Please try again later.']);
}
?>