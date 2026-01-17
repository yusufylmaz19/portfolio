// ========================================
// EMAIL CONFIGURATION (EmailJS)
// ========================================
// EmailJS servisini kullanarak form gönderimi için gerekli bilgiler

const EMAIL_CONFIG = {
    // EmailJS hesabınızdan alacağınız bilgiler
    // https://www.emailjs.com/ adresinden hesap oluşturup bilgileri buraya ekleyin

    SERVICE_ID: 'service_26wl5bi',      // Örnek: 'service_abc123'
    TEMPLATE_ID: 'template_q2b9pav',    // Örnek: 'template_xyz789'
    PUBLIC_KEY: 'GaxhyCg5Vkovc8wKL'       // Örnek: 'abcdefgh123456'
};

// ⚠️ UYARI: Bu dosyayı GitHub'a push etmeden önce .gitignore'a ekleyin!
// Veya environment variables kullanın

/**
 * EmailJS Kurulum Talimatları:
 * 
 * 1. https://www.emailjs.com/ adresine gidin ve ücretsiz hesap oluşturun
 * 
 * 2. Email Service Ekleyin:
 *    - Dashboard > Email Services > Add New Service
 *    - Gmail, Outlook, veya tercih ettiğiniz servisi seçin
 *    - Service ID'yi kopyalayıp yukarıdaki SERVICE_ID'ye yapıştırın
 * 
 * 3. Email Template Oluşturun:
 *    - Dashboard > Email Templates > Create New Template
 *    - Template içeriği:
 *      Subject: Portfolyo - Yeni Mesaj: {{from_name}}
 *      
 *      Merhaba,
 *      
 *      {{from_name}} adlı kişiden yeni bir mesaj aldınız:
 *      
 *      Email: {{from_email}}
 *      
 *      Mesaj:
 *      {{message}}
 *      
 *      ---
 *      Bu mesaj portfolyo contact formundan gönderildi.
 * 
 *    - Template ID'yi kopyalayıp yukarıdaki TEMPLATE_ID'ye yapıştırın
 * 
 * 4. Public Key Alın:
 *    - Dashboard > Account > API Keys
 *    - Public Key'i kopyalayıp yukarıdaki PUBLIC_KEY'e yapıştırın
 * 
 * 5. Test Edin:
 *    - Form'u doldurup gönderin
 *    - Email adresinize mesajın gelip gelmediğini kontrol edin
 */

export default EMAIL_CONFIG;
